import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css'; // CSS 스타일 import

// OpenAI API 키
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

function ChatBot({onClose }) {
    const [messages, setMessages] = useState([]);  // 채팅 메시지 저장
    const [userInput, setUserInput] = useState('');  // 사용자 입력 상태 관리
    const [isTyping, setIsTyping] = useState(false); // 타이핑 여부 상태 관리
    const chatBoxRef = useRef(null); // 채팅 박스를 참조하여 스크롤 관리

    useEffect(() => {
        // 로컬 저장소에서 이전 메시지 가져오기
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages); // 메시지 상태에 반영
    }, []); // 최초 한 번만 실행

    useEffect(() => {
        // messages 상태가 변경될 때마다 로컬 저장소에 저장
        if (messages.length > 0) {
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages]); // messages가 변경될 때마다 실행

    // 타이핑 효과 구현
    const simulateTypingEffect = (messageText, callback) => {
        let index = 0;
        setIsTyping(true);
        let currentMessage = ''; // 타이핑 중인 메시지를 보관할 변수

        // 타이핑 효과
        const typingInterval = setInterval(() => {
            if (index < messageText.length) {
                // 한 글자씩 추가하여 메시지를 갱신
                currentMessage += messageText[index];
                setMessages((prevMessages) => {
                    const lastMessage = prevMessages[prevMessages.length - 1];
                    return [...prevMessages.slice(0, -1), { ...lastMessage, text: currentMessage }];
                });
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                callback(); // 타이핑 종료 후 호출
            }
        }, 100); // 100ms 간격으로 타이핑 효과 구현
    };

    // 메시지에 자동으로 <br /> 추가
    const formatMessageText = (text) => {
        return text.split('\n').map((str, index) => (
            <React.Fragment key={index}>
                {str}
                {index < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    // 메시지 보내기
    const sendMessage = async () => {
        if (userInput.trim() === '' || isTyping) return; // 타이핑 중일 때는 메시지 전송을 막음

        // 0. 입력 필드 비우기
        setUserInput('');

        const userMessage = {
            sender: 'user',
            text: userInput,
            timestamp: new Date().toLocaleTimeString(),
        };

        // 1. 사용자 메시지 추가
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // 2. OpenAI ChatGPT API로 메시지 보내기
        try {
            const gptMessage = await getChatGPTResponse(userInput);

            // 3. 타이핑 시작 전에 먼저 메시지 순서대로 추가
            setIsTyping(true); // 타이핑 시작
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: '', timestamp: new Date().toLocaleTimeString() }, // 빈 메시지로 bot 추가
            ]);

            // 4. 타이핑 효과 후 메시지 내용 업데이트
            simulateTypingEffect(gptMessage, () => {
                setMessages((prevMessages) => {
                    // 마지막 bot 메시지의 텍스트를 실제 bot 메시지로 업데이트
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = {
                        sender: 'bot',
                        text: gptMessage,
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    return updatedMessages;
                });
            });

        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
        }


        scrollToBottom();
    };

    // OpenAI API에서 응답 받기
    const getChatGPTResponse = async (message) => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `
                        너의 이름은 프롬버스 AI의 '프롬이'이고, 육아 어플의 챗봇 AI야.
                        모든 대답은 50자 이내로, 존댓말을 사용하며 반말은 절대 쓰면 안돼 , 꼭 꼭 한국어로 답변해야 해.
                        모든건 육아에 관련된 대화여야 해. 육아가 아닌 내용에 대해서는 답변해서는 안돼. 아이 육아와 관련된 대화만 해줘. 
                        사용자의 모든 얘기에 대해서 육아와 관련된 내용으로만 답변을 해줘. 우리 어플은 발달장애 아동의 AI 주간 보고를 해주는 기능이 있어.
                        일기를 주간 단위로 3회 이상 작성시 일기 내용에 대해서 AI 분석하고 , 발달장애의 위험성을 예측해주는 기능이 있어. 관련해서 안내를 해줘야해. 
                    `,
                    },
                    { role: 'user', content: message },
                ],
            }),
        });
        const data = await response.json();
        return data.choices[0].message.content.trim();
    };

    // 스크롤을 항상 최신 메시지로 내리기
    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    // 컴포넌트가 처음 마운트될 때 초기 메시지를 타이핑 효과로 처리
    useEffect(() => {
        const fetchMessages = async () => {
            const initialMessages = [
                { sender: 'bot', text: '안녕하세요! 저는 프롬버스 AI "프롬이"에요 :D \n 무엇을 도와드릴까요?', timestamp: new Date().toLocaleTimeString() },
            ];
            setMessages(initialMessages); // 처음 메시지 표시
            const initialMessage = initialMessages[0];
            simulateTypingEffect(initialMessage.text, () => {}); // 첫 번째 메시지 타이핑 효과
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        // 채팅박스를 항상 최신 상태로 스크롤
        scrollToBottom();
    }, [messages]); // messages가 바뀔 때마다 호출

    return (
        <div className="chat-container">
            <div className="chatbot-header">
                <button className="close-btn" onClick={onClose}>×
                </button>
            </div>
            <div className="user-info">
                <div className="name">
                프롬이 AI
                    <div className="address">
                        <i className="bi bi-geo-alt"></i>
                        <span>프롬버스(FromBirth)</span>
                    </div>
                </div>
            </div>

            <div className="chat-inner">
                <div className="chat-box" ref={chatBoxRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <div className={message.sender === 'bot' ? 'left' : 'right'}>
                                {message.sender === 'bot' && (
                                    <div className="profile-img">
                                        <img src="/src/assets/img/baby2.png" alt="Bot"/>
                                    </div>
                                )}
                                <div className="message-text">
                                    {formatMessageText(message.text)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        id="chat-input"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="메시지를 입력하세요"
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        disabled={isTyping}  // 타이핑 중이면 비활성화
                    />
                    <button
                        type="button"
                        onClick={sendMessage}
                        disabled={isTyping}  // 타이핑 중이면 비활성화
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
