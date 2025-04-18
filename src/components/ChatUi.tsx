import { Box, Button, Fab, Typography, alpha, LinearProgress, TextField } from "@mui/material";
import { MonetizationOn, SendRounded } from "@mui/icons-material";

interface ChatUiProps {
  messages?: { id: string; text: string; sender: string }[];
  chatAds?: { assetUrl: string }[];
  chatAdIndex?: number;
  editorState: { content: string; selection: { start: number; end: number } };
  resetCreator: () => void;
  msgSender: { id: string; name: string };
  showGiphyModal: boolean;
  anchorElPopover: HTMLElement | null;
  sendMessage: () => void;
  sendGiphy: (data: { url: string; title: string }) => void;
  onDonate: (value: boolean) => void;
  updateChatState: (state: Record<string, unknown>) => void;
}

const ChatUi = ({
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Chat UI component that displays a chat window with input box and a send button.
 *
 * @param {object} props Component props
 * @param {array} props.messages List of messages to display in the chat window
 * @param {array} props.chatAds List of chat ads to display in the chat window
 * @param {number} props.chatAdIndex Index of the current chat ad to display
 * @param {object} props.editorState State of the Bolt editor
 * @param {function} props.resetCreator Function to reset the Bolt mention creator
 * @param {function} props.msgSender Function to send a message
 * @param {function} props.sendGiphy Function to send a giphy
 * @param {function} props.onDonate Function to handle donate button click
 * @param {function} props.updateChatState Function to update the chat state
 * @returns {ReactElement} Chat UI component
 */

/*******  df511e86-7820-43a5-9cbc-ba10ab1fb6a1  *******/  messages = [],
  chatAds = [],
  chatAdIndex = 0,
  sendMessage,
  onDonate,
  updateChatState,
}: ChatUiProps) => {
  const renderChatAd = (index: number) => {
    if (chatAds.length === 0) return null;
    if ((index + 1) % 8 === 0) {
      return (
        <div>
          {chatAds[chatAdIndex] && (
            <img src={chatAds[chatAdIndex].assetUrl} alt="Chat Ad" style={{ width: "100%" }} />
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <LinearProgress
        sx={{
          width: 1,
          height: "1px",
          position: "sticky",
          top: 70,
          zIndex: 10,
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column-reverse", mt: "auto" }}>
          {messages.map((item, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <Typography variant="body1">{item.text}</Typography>
              {renderChatAd(index)}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            py: 1,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            position: "sticky",
            bottom: 0,
            width: "100%",
            bgcolor: alpha("#13162C", 0.6),
            backdropFilter: "blur(40px)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            variant="outlined"
            placeholder="Type something..."
            onChange={(e) => updateChatState({ message: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            sx={{
              backgroundColor: "#373947",
              borderRadius: 2,
              px: 1,
              "& .MuiOutlinedInput-root": {
                color: "#fff",
              },
            }}
          />

          <Fab
            variant="circular"
            color="primary"
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              px: 2.3,
              background: "linear-gradient(93.56deg, #6535E9 4.6%, #4E33E9 96.96%)",
              borderRadius: 2,
              ml: 1,
              zIndex: 1,
            }}
            onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <SendRounded sx={{ width: 18, height: 18, color: "white" }} />
          </Fab>

          <Box sx={{ px: 1, alignItems: "center", gap: 1 }}>
            <Button
              disableElevation
              variant="contained"
              startIcon={<MonetizationOn />}
              sx={{ borderRadius: 1.5 }}
              onClick={() => onDonate(true)}
            >
              <Typography sx={{ fontWeight: "600" }} variant="body2">
                Donate
              </Typography>
            </Button>

            <Typography sx={{ fontSize: 12 }}>to support your favourite streamers!</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ChatUi;
