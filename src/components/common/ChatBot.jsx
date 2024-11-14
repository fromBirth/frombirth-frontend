import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css'; // CSS 스타일 import

// OpenAI API 키
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

function ChatBot({ onClose }) {
    const [messages, setMessages] = useState([]);  // 채팅 메시지 저장
    const [userInput, setUserInput] = useState('');  // 사용자 입력 상태 관리
    const [isTyping, setIsTyping] = useState(false); // 타이핑 여부 상태 관리
    const chatBoxRef = useRef(null); // 채팅 박스를 참조하여 스크롤 관리
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [chatHeight, setChatHeight] = useState('70vh'); // 채팅 박스 높이를 관리하는 상태



    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);
    }, [messages]);

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
        }, 25); // -ms 간격으로 타이핑 효과 구현
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
        setIsLoading(true); // 로딩 종료
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

        setIsLoading(false); // 로딩 종료
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
                    너의 이름은 프롬버스 AI의 '프롬이'이고, 육아와 발달장애 조기 진단을 돕는 AI 챗봇이야.
                    너의 주요 역할은 부모가 아이의 성장 기록과 육아일기를 작성할 때 그 정보를 바탕으로 맞춤형 육아 조언을 제공하고, 발달장애 조기 진단을 위한 안내를 돕는 거야. 
                    
                    답변은 존댓말을 사용하며 한국어로 간결하고 친절하게 50자 이내로 응답해줘. 반말은 절대 쓰지 않아.
                    
                    주의할 점:
                    - 육아, 발달장애 관련 질문에만 대답해. 그 외 주제는 답하지 마.
                    - 부모가 작성한 일기가 주간 3회 이상 기록되면, 'AI 주간 보고'를 통해 아이의 발달 상태를 분석하고 장애 위험성을 예측해.
                    - 육아일기와 기록을 통해 관찰된 발달 상태가 정상인지, 아니면 추가적인 조언이 필요한지를 판단하고, 필요시 가까운 병원 정보 제공도 고려해.
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
            simulateTypingEffect(initialMessage.text, () => { }); // 첫 번째 메시지 타이핑 효과
        };

        fetchMessages();
    }, []);

    // 화면 크기와 키보드 상태를 감지하여 채팅 박스의 높이를 조정하는 함수
    const adjustChatBoxHeight = () => {
        const windowHeight = window.innerHeight;
        const keyboardHeight = windowHeight < 600 ? 0.3 : 0; // 작은 화면에서는 키보드가 나타날 것으로 가정하고 높이를 줄임

        // 화면 크기나 키보드 상태에 따라 높이 조정
        setChatHeight(`${Math.min(windowHeight * 0.7 - keyboardHeight * windowHeight, 500)}px`);
    };

    useEffect(() => {
        adjustChatBoxHeight(); // 화면 로드 시 한 번 높이 조정

        // resize 이벤트에 따라 높이를 동적으로 조정
        window.addEventListener('resize', adjustChatBoxHeight);

        // cleanup
        return () => {
            window.removeEventListener('resize', adjustChatBoxHeight);
        };
    }, []);

    useEffect(() => {
        // 채팅박스를 항상 최신 상태로 스크롤
        scrollToBottom();
    }, [messages]); // messages가 바뀔 때마다 호출

    return (
        <div className="chat-container" style={{ height: chatHeight }}>
            <div className="chatbot-header">
                <button className="close-btn" onClick={onClose}>
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="user-info">
                <div className="name">
                    프롬이 AI
                </div>
            </div>
            <div className="chat-inner">
                <div className="chat-box" ref={chatBoxRef}>
                    {messages.map((message, index) => (
                        <div className={`message-wrap ${message.sender}`} key={index}>
                            {/* 프로필 이미지 */}
                            {message.sender === 'bot' && (
                                <div className="profile-img">
                                    <img src="/src/assets/img/baby2.png" alt="Bot" />
                                </div>
                            )}
                            {/* 메시지 내용 */}
                            <div className={`message ${message.sender}`}>
                                <div className={message.sender === 'bot' ? 'left' : 'right'}>
                                    <div className="message-text">
                                        {formatMessageText(message.text)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <>
                            <div className="message-wrap">
                                <div className="profile-img">
                                    <img src="/src/assets/img/baby2.png" alt="Bot" />
                                </div>
                                <div className="loading-indicator">
                                    <dotlottie-player
                                        src="https://lottie.host/f021ff55-6da4-48fc-bb18-5418c1712cd7/dLpkefQlv4.json"
                                        background="transparent"
                                        speed="1.5"
                                        className="lottie-player-before"
                                        autoplay
                                        loop
                                        style={{
                                            width: '37px',
                                            height: '27px',
                                            marginTop: '12px',
                                        }}
                                    ></dotlottie-player>
                                </div>
                            </div>
                        </>
                    )}
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
                        disabled={isTyping || !userInput.trim()}  // 입력 값이 없으면 비활성화
                        style={{
                            backgroundColor: userInput.trim() ? '#FF893C' : '#ddd', // 입력 값이 있으면 색상 변경
                        }}
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
