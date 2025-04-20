/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export const ChatUi = () => {
  interface Ad {
    assetUrl: string;
    placement: string;
  }

  const [chatAds, setChatAds] = useState<Ad[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [chatAdIndex, setChatAdIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.staging-new.boltplus.tv/advertisements/get?limit=10&page=1&skip=0&forFrontend=true",
          {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, /",
              "Accept-Language": "en-US,en;q=0.9",
              Connection: "keep-alive",
              "If-None-Match": 'W/"bd4-ZfRvRC32ynofppJV7EVHqAPChjI"',
              Origin: "https://staging-new.boltplus.tv",
              Referer: "https://staging-new.boltplus.tv/",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-site",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
              boltsrc: "boltplus-webapp/microsoft_windows/0.1.0",
              device: "d520c7a8-421b-4563-b955-f5abc56b97ec",
              "product-token": "330dbc49a5872166f13049629596fc088b26d885",
              "sec-ch-ua":
                '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              session: "1744790058433",
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        setChatAds(data?.data?.filter((ad: any) => ad.placement === "chat"));
      } catch (e) {
        console.error("Error during fetch:", e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.staging-new.boltplus.tv/messages/open/channel/66c1ffd7dd17df41a4096484",
          {
            method: "POST",
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          console.error("Fetch error:", response.status);
          return;
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatAdIndex((prevIndex) => (prevIndex + 1) % chatAds.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [chatAds]);

  const renderChatAd = (index: number) => {
    if (chatAds.length === 0) return null; // No ads available

    if ((index + 1) % 8 === 0) {
      return (
        <div>
          {chatAds[chatAdIndex] && (
            <img
              src={chatAds[chatAdIndex].assetUrl}
              alt="Chat Ad"
              style={{ width: "100%" }}
            />
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            mt: "auto",
          }}
        >
          {messages.map((item: any, index) => (
            <Box key={index} sx={{ px: 1 }}>
              {item?.message}
              {renderChatAd(index)}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
