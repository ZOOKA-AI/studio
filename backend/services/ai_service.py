"""
AI Service module for handling AI operations
"""
import os
from typing import List, Dict, Tuple
import google.generativeai as genai

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)

async def generate_report_summary(report_data: Dict) -> Tuple[str, List[str]]:
    """
    Generate a summary and key points from report data using AI
    
    Args:
        report_data: Dictionary containing report information
        
    Returns:
        Tuple of (summary string, list of key points)
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Create prompt from report data
        prompt = f"""
        قم بتلخيص التقرير التالي وتحديد النقاط الرئيسية:
        
        العنوان: {report_data.get('title', 'غير محدد')}
        المحتوى: {report_data.get('content', '')}
        التاريخ: {report_data.get('date', 'غير محدد')}
        الموقع: {report_data.get('location', 'غير محدد')}
        العمال: {', '.join(report_data.get('workers', [])) if report_data.get('workers') else 'غير محدد'}
        
        قدم:
        1. ملخص موجز (2-3 جمل)
        2. قائمة من 3-5 نقاط رئيسية
        
        استخدم الصيغة التالية:
        الملخص: [ملخصك هنا]
        النقاط الرئيسية:
        - نقطة 1
        - نقطة 2
        - نقطة 3
        """
        
        response = model.generate_content(prompt)
        text = response.text
        
        # Parse response
        lines = text.strip().split('\n')
        summary = ""
        key_points = []
        
        in_key_points = False
        for line in lines:
            line = line.strip()
            if line.startswith('الملخص:'):
                summary = line.replace('الملخص:', '').strip()
            elif line.startswith('النقاط الرئيسية:'):
                in_key_points = True
            elif in_key_points and line.startswith('-'):
                key_points.append(line[1:].strip())
        
        # Fallback if parsing fails
        if not summary:
            summary = text[:200] + "..." if len(text) > 200 else text
        if not key_points:
            key_points = ["تم إنشاء التقرير بنجاح"]
        
        return summary, key_points
        
    except Exception as e:
        print(f"Error in generate_report_summary: {str(e)}")
        # Return fallback values
        return (
            f"تقرير: {report_data.get('title', 'غير محدد')}",
            ["تم إنشاء التقرير", "يحتوي على معلومات مهمة"]
        )

async def suggest_materials(report_data: Dict) -> List[Dict]:
    """
    Suggest materials based on report data using AI
    
    Args:
        report_data: Dictionary containing report information
        
    Returns:
        List of material suggestions with item, quantity, and reason
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        بناءً على التقرير التالي، اقترح المواد اللازمة:
        
        العنوان: {report_data.get('title', '')}
        المحتوى: {report_data.get('content', '')}
        الموقع: {report_data.get('location', '')}
        
        قدم قائمة من 3-5 مواد مع الكمية المقترحة والسبب.
        استخدم الصيغة التالية لكل مادة:
        المادة: [اسم المادة] | الكمية: [الكمية] | السبب: [السبب]
        """
        
        response = model.generate_content(prompt)
        text = response.text
        
        suggestions = []
        lines = text.strip().split('\n')
        
        for line in lines:
            if '|' in line:
                parts = line.split('|')
                if len(parts) >= 3:
                    item = parts[0].replace('المادة:', '').strip()
                    quantity = parts[1].replace('الكمية:', '').strip()
                    reason = parts[2].replace('السبب:', '').strip()
                    
                    if item and quantity:
                        suggestions.append({
                            'item': item,
                            'quantity': quantity,
                            'reason': reason
                        })
        
        # Fallback suggestions if parsing fails
        if not suggestions:
            suggestions = [
                {
                    'item': 'مواد تنظيف عامة',
                    'quantity': '1 مجموعة',
                    'reason': 'للاستخدام الأساسي'
                }
            ]
        
        return suggestions
        
    except Exception as e:
        print(f"Error in suggest_materials: {str(e)}")
        return [
            {
                'item': 'مواد تنظيف',
                'quantity': '1 مجموعة',
                'reason': 'احتياجات أساسية'
            }
        ]

async def analyze_text(text: str, analysis_type: str = "general") -> Dict:
    """
    Analyze text using AI for various purposes
    
    Args:
        text: Text to analyze
        analysis_type: Type of analysis (general, sentiment, entities, etc.)
        
    Returns:
        Dictionary with analysis results
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        if analysis_type == "sentiment":
            prompt = f"قم بتحليل المشاعر في النص التالي:\n{text}"
        elif analysis_type == "entities":
            prompt = f"استخرج الكيانات المهمة (أشخاص، أماكن، تواريخ) من النص التالي:\n{text}"
        else:
            prompt = f"قم بتحليل النص التالي وقدم رؤى مفيدة:\n{text}"
        
        response = model.generate_content(prompt)
        
        return {
            'analysis_type': analysis_type,
            'result': response.text,
            'success': True
        }
        
    except Exception as e:
        print(f"Error in analyze_text: {str(e)}")
        return {
            'analysis_type': analysis_type,
            'result': 'فشل التحليل',
            'success': False,
            'error': str(e)
        }
