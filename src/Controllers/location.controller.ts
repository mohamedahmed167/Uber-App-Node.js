import { Request, Response } from "express";
import axios from "axios";

export const searchLocation = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 5,
          countrycodes: "eg",
        },

        headers: {
          "User-Agent": "RYVO-RideHailing-App",
        },
      },
    );

    const locations = response.data.map((place: any) => ({
      name: place.display_name,
      latitude: Number(place.lat),
      longitude: Number(place.lon),
      type: place.type,
    }));

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error: any) {
    console.log(
      "Search location error:",
      error.response?.data || error.message,
    );

    return res.status(500).json({
      success: false,
      message: "Error while searching locations",
    });
  }
};
