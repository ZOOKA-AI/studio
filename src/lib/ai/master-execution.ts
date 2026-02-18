import { OmniPublisher } from './omni-publisher';
import { CAMPAIGNS, type CampaignBrand } from './campaign-config';

/**
 * Execute global marketing campaign launch
 * Publishes content for both Royal Clean (local UAE) and Zooka-AI (global)
 */
export async function executeGlobalLaunch(brand: CampaignBrand = 'royal_clean') {
  const publisher = new OmniPublisher();
  const content = CAMPAIGNS[brand];

  console.log(`🚀 Launching ${brand === 'royal_clean' ? 'Royal Clean UAE' : 'Zooka-AI Global'} campaign...`);
  
  try {
    const results = await publisher.publishToAll(content);
    
    const successCount = results.filter(r => r.success).length;
    console.log(`✅ Successfully published to ${successCount}/${results.length} platforms`);
    
    return {
      success: true,
      results,
      summary: {
        total: results.length,
        successful: successCount,
        failed: results.length - successCount,
      },
    };
  } catch (error) {
    console.error('❌ Global launch failed:', error);
    throw error;
  }
}

/**
 * Execute scheduled campaign based on UAE time
 * 09:00 GST - Royal Clean local focus
 * 14:00 GST - Zooka-AI global focus
 * 20:00 GST - Mixed campaign
 */
export async function executeScheduledCampaign(timeSlot: '09:00_GST' | '14:00_GST' | '20:00_GST') {
  const strategyMap: Record<typeof timeSlot, CampaignBrand> = {
    '09:00_GST': 'royal_clean',
    '14:00_GST': 'zooka_ai',
    '20:00_GST': 'royal_clean', // Evening focus on local bookings
  };

  const brand = strategyMap[timeSlot];
  
  console.log(`⏰ Executing scheduled campaign for ${timeSlot} - Brand: ${brand}`);
  
  return executeGlobalLaunch(brand);
}
