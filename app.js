const { useState, useEffect } = React;

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize GSAP animations
    gsap.from("#header", { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
    gsap.from("#main-content", { duration: 1, scale: 0.8, opacity: 0, delay: 0.5, ease: "back.out(1.7)" });

    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError(''); // Clear error message
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Input cannot be empty.');
      return;
    }
    
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setOutput(data.output);
      
      // Animate output appearance
      gsap.from("#output", { duration: 0.5, y: 20, opacity: 0, ease: "power2.out" });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process the input. Please try again later.');
    }
  };

  const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  };

  return React.createElement(
    'div',
    { className: 'container mx-auto p-4' },
    React.createElement('h1', { 
      id: 'header',
      className: 'text-5xl font-bold mb-8 text-center neon-text animate__animated animate__pulse animate__infinite'
    }, 'Natural Language Coding'),
    React.createElement('div', { 
      id: 'main-content',
      className: 'glass-morphism p-8 max-w-2xl mx-auto'
    },
      !isLoggedIn
        ? React.createElement(
            'div',
            { className: 'space-x-4 text-center' },
            React.createElement(
              'button',
              {
                onClick: () => setShowLoginForm(true),
                className: 'bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110',
              },
              React.createElement('i', { className: 'fas fa-sign-in-alt mr-2' }),
              'Login'
            ),
            React.createElement(
              'button',
              {
                onClick: () => setShowSignUpForm(true),
                className: 'bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110',
              },
              React.createElement('i', { className: 'fas fa-user-plus mr-2' }),
              'Sign Up'
            )
          )
        : React.createElement(
            'div',
            null,
            React.createElement('textarea', {
              value: input,
              onChange: handleInputChange,
              className: 'w-full h-40 p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:border-transparent',
              placeholder: 'Enter your natural language code here...',
            }),
            React.createElement(
              'button',
              {
                onClick: handleSubmit,
                className: 'w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105',
              },
              React.createElement('i', { className: 'fas fa-code mr-2' }),
              'Process Code'
            ),
            error && React.createElement('p', { className: 'text-red-500 mt-2' }, error),
            React.createElement('pre', { 
              id: 'output',
              className: 'mt-6 p-4 bg-gray-800 text-green-400 rounded-lg overflow-x-auto'
            }, output)
          )
    ),
    React.createElement('div', { 
      className: 'mt-8 text-center text-white'
    },
      React.createElement('p', { className: 'text-lg mb-4' }, "Transform your ideas into code effortlessly!"),
      React.createElement('div', { className: 'flex justify-center space-x-6' },
        React.createElement('i', { className: 'fab fa-python text-5xl floating' }),
        React.createElement('i', { className: 'fab fa-js-square text-5xl floating' }),
        React.createElement('i', { className: 'fab fa-java text-5xl floating' })
      )
    ),
    showLoginForm &&
      React.createElement(
        'div',
        { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate__animated animate__fadeIn' },
        React.createElement(
          'div',
          { className: 'bg-white p-8 rounded-lg' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Login'),
          React.createElement(
            'button',
            {
              onClick: () => setShowLoginForm(false),
              className: 'mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out',
            },
            'Close'
          )
        )
      ),
    showSignUpForm &&
      React.createElement(
        'div',
        { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate__animated animate__fadeIn' },
        React.createElement(
          'div',
          { className: 'bg-white p-8 rounded-lg' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Sign Up'),
          React.createElement(
            'button',
            {
              onClick: () => setShowSignUpForm(false),
              className: 'mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out',
            },
            'Close'
          )
        )
      )
  );
};

ReactDOM.render(React.createElement(App), document.getElementById('root'));
