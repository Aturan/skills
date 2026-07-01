#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${BACKLOG_CWD:-}" ]]; then
  if [[ -d "$HOME/backlog" ]]; then
    BACKLOG_CWD="$HOME/backlog"
  else
    BACKLOG_CWD="$HOME/.backlog"
  fi
fi

export BACKLOG_CWD
exec backlog "$@"
