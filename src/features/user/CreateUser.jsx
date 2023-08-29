import { useState } from 'react';
 import { useDispatch } from "react-redux";
import { updateUsername } from "./userSlice.js";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return

    dispatch(updateUsername(username))
    navigate("/menu")
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">👋 Welcome! Please start by telling us your name:</p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <button>Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
