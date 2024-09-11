// server/src/controllers/newsController.ts
import axios from 'axios';

const getNews = async (req: any, res: any) => {
  const { query = '', page = 1 } = req.query;
  try {
    console.log("Fetching news with query:", query, "and page:", page);
    
    const response = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q: query || 'breaking news', // Provide a default query for testing
        lang: 'en',
        max: 10,
        page,
        token: process.env.GNEWS_API_KEY,
      },
    });

    console.log("News fetched successfully:", response.data);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching news:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Server Error', error: error.response ? error.response.data : error.message });
  }
};

export default getNews;

// import axios from 'axios';

// const getNews = async (req: any, res:any) => {
//   const { query = '', page = 1 } = req.query;
//   try {
//     const response = await axios.get(`https://gnews.io/api/v4/search`, {
//       params: {
//         q: query,
//         lang: 'en',
//         max: 10,
//         page,
//         token: process.env.GNEWS_API_KEY,
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// export default getNews;
