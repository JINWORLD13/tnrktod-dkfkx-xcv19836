export const isBot = () => {
  const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'bot',
      'robot',
      'robots',
      'googlebot',        
      'bingbot',         
      'yandexbot',       
      'naverbot',        
      'daumoa',          
      'baiduspider',     
      'mediapartners-google', 
      'adsbot-google',       
      'apis-google',         
      'feedfetcher-google',  
      'facebookexternalhit',  
      'twitterbot',           
      'linkedinbot',          
      'ahrefsbot',           
      'mj12bot',             
      'seznambot',           
      'semrushbot',          
      'dotbot',              
      'applebot',            
      'slurp'                
    ];
    return botPatterns.some(bot => userAgent.includes(bot));
  };
