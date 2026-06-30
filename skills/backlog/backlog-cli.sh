#!/usr/bin/env bash
set -euo pipefail

BACKLOG_CWD="${BACKLOG_CWD:-$HOME/backlog}" exec backlog "$@"
