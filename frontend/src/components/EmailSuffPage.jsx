import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrompt,
  setRecipients,
  setSubject,
  setBody,
} from "../redux/emailSlice";
import { generateEmail, sendEmail } from "../redux/services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EmailStuffPage() {
  const dispatch = useDispatch();
  const { prompt, recipients, subject, body, status } = useSelector(
    (s) => s.email
  );

  const loading = status === "loading" || status === "sending";

  const onGenerate = () => {
    const recipList = recipients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    dispatch(generateEmail({ prompt, recipients: recipList }));
  };

  const onSend = () => {
    const recipList = recipients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    dispatch(sendEmail({ subject, body, recipients: recipList }));
  };

  const emailGenerated = subject.trim() !== "" || body.trim() !== "";

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold mb-4">AI Generated Email Sender</h1>

      {/* Recipients */}
      <label className="block mb-2 font-semibold">Recipients</label>
      <input
        value={recipients}
        onChange={(e) => dispatch(setRecipients(e.target.value))}
        className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="emanish365@gmail.com"
      />

      {/* Prompt */}
      <label className="block mb-2 font-semibold">Prompt</label>
      <textarea
        value={prompt}
        onChange={(e) => dispatch(setPrompt(e.target.value))}
        className="border p-2 w-full mb-4 h-28 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a friendly follow-up..."
      />

      {/* Generate Button */}
      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          disabled={loading || !prompt.trim()}
          className={`px-4 py-2 rounded-md text-white ${
            loading || !prompt.trim()
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading && status === "loading" ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </span>
          ) : (
            "Generate Email"
          )}
        </button>
      </div>

      {/* Email Editor */}
      {emailGenerated && (
        <>
          <hr className="my-4" />

          {/* Subject */}
          <label className="block mb-2 font-semibold">Subject</label>
          <input
            value={subject}
            onChange={(e) => dispatch(setSubject(e.target.value))}
            className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Body with ReactQuill */}
          <label className="block mb-2 font-semibold">Body</label>
          <ReactQuill
            value={body}
            onChange={(value) => dispatch(setBody(value))}
            className="mb-4 bg-white"
            theme="snow"
          />

          {/* Send Button */}
          <div className="flex gap-2 items-center">
            <button
              onClick={onSend}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading && status === "sending" ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : (
                "Send Email"
              )}
            </button>

            {/* Status */}
            {status && status !== "idle" && (
              <div className="text-sm text-gray-600">{status}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
