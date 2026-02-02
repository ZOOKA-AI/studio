"""
Database utilities for Firebase integration
"""
import os
from typing import Dict, List, Optional
from datetime import datetime

# Firebase Admin SDK
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    
    # Initialize Firebase Admin if not already initialized
    if not firebase_admin._apps:
        # Try to use service account if available
        service_account_path = os.getenv('FIREBASE_SERVICE_ACCOUNT')
        if service_account_path and os.path.exists(service_account_path):
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
        else:
            # Use default credentials
            firebase_admin.initialize_app()
    
    db = firestore.client()
    FIREBASE_AVAILABLE = True
except Exception as e:
    print(f"Firebase Admin SDK not available: {e}")
    FIREBASE_AVAILABLE = False
    db = None


async def get_reports(limit: int = 10) -> List[Dict]:
    """
    Get reports from Firestore
    
    Args:
        limit: Maximum number of reports to retrieve
        
    Returns:
        List of report dictionaries
    """
    if not FIREBASE_AVAILABLE:
        return []
    
    try:
        reports_ref = db.collection('reports')
        docs = reports_ref.order_by('createdAt', direction=firestore.Query.DESCENDING).limit(limit).stream()
        
        reports = []
        for doc in docs:
            report_data = doc.to_dict()
            report_data['id'] = doc.id
            reports.append(report_data)
        
        return reports
    except Exception as e:
        print(f"Error fetching reports: {e}")
        return []


async def save_report(report_data: Dict) -> Optional[str]:
    """
    Save a report to Firestore
    
    Args:
        report_data: Report data dictionary
        
    Returns:
        Document ID if successful, None otherwise
    """
    if not FIREBASE_AVAILABLE:
        return None
    
    try:
        report_data['createdAt'] = datetime.utcnow()
        report_data['updatedAt'] = datetime.utcnow()
        
        doc_ref = db.collection('reports').add(report_data)
        return doc_ref[1].id
    except Exception as e:
        print(f"Error saving report: {e}")
        return None


async def get_workers() -> List[Dict]:
    """
    Get workers from Firestore
    
    Returns:
        List of worker dictionaries
    """
    if not FIREBASE_AVAILABLE:
        return []
    
    try:
        workers_ref = db.collection('workers')
        docs = workers_ref.stream()
        
        workers = []
        for doc in docs:
            worker_data = doc.to_dict()
            worker_data['id'] = doc.id
            workers.append(worker_data)
        
        return workers
    except Exception as e:
        print(f"Error fetching workers: {e}")
        return []


async def get_tasks(status: Optional[str] = None) -> List[Dict]:
    """
    Get tasks from Firestore
    
    Args:
        status: Optional status filter
        
    Returns:
        List of task dictionaries
    """
    if not FIREBASE_AVAILABLE:
        return []
    
    try:
        tasks_ref = db.collection('tasks')
        
        if status:
            query = tasks_ref.where('status', '==', status)
        else:
            query = tasks_ref
        
        docs = query.stream()
        
        tasks = []
        for doc in docs:
            task_data = doc.to_dict()
            task_data['id'] = doc.id
            tasks.append(task_data)
        
        return tasks
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return []


async def update_inventory(item_id: str, quantity_change: int) -> bool:
    """
    Update inventory quantity
    
    Args:
        item_id: Inventory item ID
        quantity_change: Change in quantity (positive or negative)
        
    Returns:
        True if successful, False otherwise
    """
    if not FIREBASE_AVAILABLE:
        return False
    
    try:
        item_ref = db.collection('inventory').document(item_id)
        item = item_ref.get()
        
        if not item.exists:
            return False
        
        current_quantity = item.to_dict().get('quantity', 0)
        new_quantity = current_quantity + quantity_change
        
        item_ref.update({
            'quantity': new_quantity,
            'updatedAt': datetime.utcnow()
        })
        
        return True
    except Exception as e:
        print(f"Error updating inventory: {e}")
        return False
