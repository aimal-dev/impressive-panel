/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

export const ChatUi = () => {
  interface Ad {
    assetUrl: string
    placement: string
  }

  const [chatAds, setChatAds] = useState<Ad[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [chatAdIndex, setChatAdIndex] = useState(0)

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          'https://api.staging-new.boltplus.tv/advertisements/get?limit=10&page=1&skip=0&forFrontend=true',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Accept-Language': 'en-US,en;q=0.9',
              Connection: 'keep-alive',
              Origin: 'https://staging-new.boltplus.tv',
              Referer: 'https://staging-new.boltplus.tv/',
              'User-Agent': 'Mozilla/5.0',
              boltsrc: 'boltplus-webapp/microsoft_windows/0.1.0',
              device: 'd520c7a8-421b-4563-b955-f5abc56b97ec',
              'product-token': '330dbc49a5872166f13049629596fc088b26d885',
              session: '1744790058433',
              'Cache-Control': 'no-cache'
            }
          }
        )

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        setChatAds(data?.data?.filter((ad: any) => ad.placement === 'chat'))
      } catch (e) {
        console.error('Error fetching ads:', e)
      }
    }

    fetchAds()
  }, [])

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          'https://api.staging-new.boltplus.tv/messages/open/channel/66c1ffd7dd17df41a4096484',
          {
            method: 'POST',
            body: JSON.stringify({})
          }
        )

        if (!response.ok) {
          console.error('Fetch error:', response.status)
          return
        }

        const data = await response.json()
        console.log('Fetched messages payload', data)
        setMessages(data)
      } catch (error) {
        console.error('Error during fetch:', error)
      }
    }

    fetchMessages()
  }, [])

  // Rotate ads every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setChatAdIndex(prevIndex => (prevIndex + 1) % chatAds.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [chatAds])

  // Utility: Get first letter of name
  const getInitial = (name?: string) => {
    if (!name) return ''
    return name.trim()[0].toUpperCase()
  }

  // Utility: Get color from name
  const getColorFromName = (name: string) => {
    const colors = ['#F44336', '#2196F3', '#FF9800', '#4CAF50', '#9C27B0']
    const hash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  // Render ads every 8th message
  const renderChatAd = (index: number) => {
    if (chatAds.length === 0) return null
    if ((index + 1) % 8 === 0) {
      return (
        <Box mt={1}
        style={{ width: '97%', borderRadius: 8 , padding: '0px'}}
        > 
          {chatAds[chatAdIndex] && (
            <img
              src={chatAds[chatAdIndex].assetUrl}
              alt='Chat Ad'
              style={{ width: '100%', borderRadius: 8 }}
            />
          )}
        </Box>
      )
    }
    return null
  }

  return (
    <Box
      className='chat-ui'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        p: 2,
        backgroundColor: '#0b0c2a',
        color: 'white',
        opacity: 0.9,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto',
          mt: 'auto'
        }}
      >
        {messages.map((item: any, index: number) => {
          const name = item?.sender?.fullName || 'User'
          const avatarUrl = item?.sender?.photoUrl
          const initial = getInitial(name)

          return (
            <Box
              className='message'
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                mb: 2
              }}
            >
              {/* Top row: Avatar + Username */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {avatarUrl ? (
                  <Box
                    component='img'
                    src={avatarUrl}
                    alt={name}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: getColorFromName(name),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    {initial}
                  </Box>
                )}
                <Box sx={{ fontWeight: 600 }}>{name}</Box>
              </Box>

              {/* Message line */}
              <Box sx={{ pl: '44px' }}>{item?.message}</Box>

              {/* Optional Ad */}
              {renderChatAd(index)}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
