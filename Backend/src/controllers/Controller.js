import Note from "../models/Notes.js";
import { hash, compare } from "bcryptjs";
import { nanoid } from "nanoid";
import generateSummary from "../services/Services.js";

export async function createNote(req, res, next) {
  try {
    const { content, expiry } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Note cannot be empty" });
    }

    if (content.length > 500) {
      return res.status(400).json({ error: "Note must be under 500 characters" });
    }

    const password = nanoid(12);
    const passwordHash = await hash(password, 10);

    const noteId = nanoid(10);

    let expiresAt = null;

    if (expiry) {
      const expiryMap = {
        "1h": 60 * 60 * 1000,
        "24h": 24 * 60 * 60 * 1000,
        "7d": 7 * 24 * 60 * 60 * 1000
      };

      if (expiryMap[expiry]) {
        expiresAt = new Date(Date.now() + expiryMap[expiry]);
      }
    }

    const newNote = await Note.create({
      noteId,
      content,
      passwordHash,
      expiresAt
    });
    const baseUrl = process.env.CLIENT_URL || "http://localhost:3000";
    res.status(201).json({
      id: newNote.noteId,
      url: `${baseUrl}/notes/${noteId}`,
      password,
    });

  } catch (err) {
    next(err);
  }
}

export async function checkNote(req, res, next) {
  try {

    const { noteId } = req.params;

    const note = await Note.findOne({ noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.expiresAt && note.expiresAt < new Date()) {
      return res.status(404).json({ error: "Note expired" });
    }

    res.status(200).json({
      exists: true
    });

  } catch (err) {
    next(err);
  }
}

export async function unlockNote(req, res, next) {
  try {

    const { noteId } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }

    const note = await Note.findOne({ noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.expiresAt && note.expiresAt < new Date()) {
      return res.status(404).json({ error: "Note expired" });
    }

    const isMatch = await compare(password, note.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({
      content: note.content
    });

  } catch (err) {
    next(err);
  }
}

export async function getSummary(req, res, next) {
  try {
    const { noteId } = req.params;

    if (!noteId) {
      return res.status(400).json({ error: "noteId required" });
    }

    const note = await Note.findOne({ noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.aiSummary) {
      return res.json({
        summary: note.aiSummary,
        cached: true
      });
    }

    const summary = await generateSummary(note.content);

    note.aiSummary = summary;
    await note.save();

    res.json({
      summary,
      cached: false
    });

  } catch (err) {
    console.error("Error generating summary:", err);
    res.status(502).json({ error: "AI Service unavailable" });
  }
}