#!/usr/bin/env python3
"""
Test script for AI services
"""
import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

from services.ai_service import generate_report_summary, suggest_materials, analyze_text


async def test_report_summary():
    """Test report summary generation"""
    print("\n" + "="*50)
    print("Testing Report Summary Generation")
    print("="*50)
    
    test_report = {
        'title': 'تقرير تنظيف يومي',
        'content': 'تم تنظيف المبنى بالكامل وإزالة جميع القمامة. العمل تم بجودة عالية.',
        'date': '2026-02-02',
        'location': 'المبنى أ',
        'workers': ['أحمد', 'محمد']
    }
    
    summary, key_points = await generate_report_summary(test_report)
    
    print(f"\nالملخص: {summary}")
    print("\nالنقاط الرئيسية:")
    for point in key_points:
        print(f"  - {point}")


async def test_material_suggestions():
    """Test material suggestions"""
    print("\n" + "="*50)
    print("Testing Material Suggestions")
    print("="*50)
    
    test_report = {
        'title': 'مشروع تنظيف كبير',
        'content': 'نحتاج لتنظيف 5 طوابق وتلميع الأرضيات',
        'location': 'مركز تجاري'
    }
    
    suggestions = await suggest_materials(test_report)
    
    print("\nالمواد المقترحة:")
    for i, sugg in enumerate(suggestions, 1):
        print(f"\n{i}. المادة: {sugg['item']}")
        print(f"   الكمية: {sugg['quantity']}")
        print(f"   السبب: {sugg['reason']}")


async def test_text_analysis():
    """Test text analysis"""
    print("\n" + "="*50)
    print("Testing Text Analysis")
    print("="*50)
    
    test_text = "العمل اليوم كان ممتازاً. جميع العمال كانوا متعاونين والنتيجة رائعة."
    
    result = await analyze_text(test_text, "sentiment")
    
    print(f"\nنوع التحليل: {result['analysis_type']}")
    print(f"النتيجة: {result['result']}")
    print(f"النجاح: {'نعم' if result['success'] else 'لا'}")


async def main():
    """Run all tests"""
    print("\n🧪 Running AI Service Tests...")
    print("Note: These tests require a valid GOOGLE_API_KEY in .env file")
    
    try:
        await test_report_summary()
        await test_material_suggestions()
        await test_text_analysis()
        
        print("\n" + "="*50)
        print("✅ All tests completed!")
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error during testing: {str(e)}")
        print("Make sure you have set GOOGLE_API_KEY in backend/.env file")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
