// server/src/controllers/newsController.ts
import axios from 'axios';

const getNews = async (req: any, res: any) => {
  const { query = '', page = 1 } = req.query; // Get the query and page number from the request query parameters
  try {
    
    
    // Fetch news from the GNews API
    const response = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q: query || 'breaking news', // Provide a default query for testing
        lang: 'en',
        max: 10,
        page,
        token: process.env.GNEWS_API_KEY,
      },
    });

 
    res.json(response.data); // Send the news data back to the client
  } catch (error: any) { // Handle errors
    console.error("Error fetching news:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Server Error', error: error.response ? error.response.data : error.message });
  }
};

export default getNews;

