#!/usr/bin/env python3
"""Download a YouTube video transcript."""

import argparse
import sys

from youtube_transcript_api import YouTubeTranscriptApi


def extract_video_id(url_or_id: str) -> str:
    """Extract video ID from a YouTube URL or return as-is if already an ID."""
    if "youtube.com" in url_or_id:
        from urllib.parse import urlparse, parse_qs
        query = parse_qs(urlparse(url_or_id).query)
        if "v" in query:
            return query["v"][0]
    if "youtu.be/" in url_or_id:
        return url_or_id.split("youtu.be/")[1].split("?")[0]
    return url_or_id


def get_transcript(video_url: str) -> str:
    video_id = extract_video_id(video_url)
    transcript = YouTubeTranscriptApi().fetch(video_id)
    return "\n".join(snippet.text for snippet in transcript)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download a YouTube video transcript")
    parser.add_argument("video", help="YouTube video URL or ID")
    args = parser.parse_args()

    try:
        text = get_transcript(args.video)
        print(text)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
