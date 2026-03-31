# Ghostty + Oh My Zsh + Starship for DevOps and Software Development

A practical mini-course for building a fast, clean, and productive terminal setup.

---

## Who this course is for

This setup is a strong fit if you spend a lot of time in the terminal and want:

- a modern terminal emulator;
- a shell that is comfortable for daily work;
- a prompt that stays fast but shows useful context;
- plugins that help with Git, Kubernetes, Docker, Terraform, cloud CLIs, and general development.

This guide is intentionally practical. The goal is not to install every popular plugin. The goal is to build a setup that feels good every day and does not become slow, noisy, or fragile.

---

## What you will build

By the end of this mini-course, you will have:

- **Ghostty** as your terminal emulator;
- **Zsh** as your shell;
- **Oh My Zsh** as the shell framework;
- **Starship** as the prompt;
- a carefully selected set of plugins and tools for DevOps and software development;
- a clean `~/.zshrc` and a simple `starship.toml` you can keep in Git.

---

## Why this stack is worth using

### 1. Ghostty gives you a modern terminal

Ghostty is a fast, GPU-accelerated terminal emulator with native UI and built-in shell integration. It feels modern, supports theming well, and is a strong choice if you want a polished terminal without moving into a highly opinionated terminal workflow.

### 2. Oh My Zsh makes Zsh easier to manage

Zsh is powerful on its own, but Oh My Zsh gives you a practical structure for aliases, plugins, completions, and general shell quality-of-life improvements.

### 3. Starship is better than heavy shell themes for many people

Instead of using a giant shell theme framework, Starship provides a prompt that is fast, portable, and easier to reason about. It also works consistently across machines and shells.

### 4. This stack scales well

It works for:

- application developers;
- DevOps and platform engineers;
- SREs;
- cloud engineers;
- people who switch between macOS and Linux.

---

## Course structure

1. Install the base tools
2. Configure Ghostty
3. Install and configure Oh My Zsh
4. Install Starship
5. Add high-value plugins and CLI tools
6. Build a clean `~/.zshrc`
7. Build a useful `starship.toml`
8. Add DevOps aliases and helper functions
9. Verify the final result
10. Troubleshoot common issues

---

# Module 1. Install the base tools

## macOS example with Homebrew

```bash
brew install ghostty zsh starship \
  zoxide fzf eza bat fd ripgrep jq yq direnv \
  kubectl kubectx k9s terraform lazygit
```

Depending on your workflow, you may also want:

```bash
brew install helm docker-compose awscli azure-cli google-cloud-sdk
```

## Linux

Install the same tools with your distribution package manager where possible. For Ghostty specifically, check the official installation page because official prebuilt packages are distributed for macOS, while Linux availability depends on distro maintainers and community packaging.

---

# Module 2. Configure Ghostty

## Why Ghostty matters in this setup

Ghostty is not just the app that opens your shell. It affects:

- font rendering;
- key bindings;
- shell integration;
- theme consistency;
- terminal responsiveness.

## Recommended first steps

### 1. Enable a good programming font

Use a Nerd Font if you want Starship symbols to look correct.

Good choices:

- JetBrainsMono Nerd Font
- FiraCode Nerd Font
- MesloLGS Nerd Font

### 2. Turn on Ghostty shell integration

Ghostty supports shell integration and can automatically inject it for shells including Zsh. This improves some terminal features and makes the terminal feel more polished.

### 3. Pick a simple theme

Do not overcomplicate the visual layer at the beginning. Good terminal UX comes more from spacing, contrast, readable font size, and useful prompt content than from complex color tricks.

## Example Ghostty config

Typical config location:

- macOS: `~/.config/ghostty/config`
- Linux: `~/.config/ghostty/config`

Example:

```conf
font-family = JetBrainsMono Nerd Font
font-size = 14

shell-integration = zsh

theme = catppuccin-mocha
window-padding-x = 10
window-padding-y = 10
cursor-style = block
copy-on-select = false
confirm-close-surface = false
```

Keep this file minimal. Ghostty has a large config reference, but you do not need to tune everything.

---

# Module 3. Install and configure Oh My Zsh

## Install Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

This creates your base `~/.zshrc` and sets up the framework structure.

## Important principle

Use Oh My Zsh for structure and plugins, but do **not** rely on a heavy prompt theme from Oh My Zsh when you are already using Starship.

Set:

```bash
ZSH_THEME=""
```

That prevents theme conflicts and keeps prompt behavior clean.

---

# Module 4. Install Starship

## Why Starship instead of an Oh My Zsh theme

Because Starship is:

- fast;
- cross-shell;
- easy to version in Git;
- modular;
- much easier to port between machines.

## Enable Starship in Zsh

Add this near the end of `~/.zshrc`:

```bash
eval "$(starship init zsh)"
```

## Create the config file

```bash
mkdir -p ~/.config
touch ~/.config/starship.toml
```

---

# Module 5. Add the right plugins and tools

This is the most important section.

A good shell setup is not about installing fifty plugins. It is about selecting tools that remove friction from daily work.

## Core plugin set

### 1. `git`

The Oh My Zsh `git` plugin is almost mandatory. It provides useful aliases and helpers for everyday Git work.

### 2. `zsh-autosuggestions`

Suggests commands from your history as you type. Extremely useful for repetitive terminal work.

### 3. `zsh-syntax-highlighting`

Highlights valid and invalid commands before execution. This is especially helpful when working with long shell commands, Kubernetes commands, SSH commands, and destructive operations.

### 4. `fzf`

A fuzzy finder that becomes useful almost everywhere:

- file search;
- history search;
- repo navigation;
- interactive selection.

### 5. `zoxide`

A smarter `cd`. Over time it becomes one of the highest-ROI tools in the shell.

### 6. `direnv`

Auto-loads environment variables per project directory. Very useful for cloud credentials, language runtimes, local services, and per-project configuration.

---

## Good Oh My Zsh plugins for DevOps and development

Enable only the ones you truly use.

Recommended set:

```bash
plugins=(
  git
  docker
  docker-compose
  kubectl
  terraform
  aws
  gh
  python
  pip
  vscode
  fzf
)
```

### Notes on this list

- `git` — essential;
- `docker` and `docker-compose` — useful if you work with containers locally;
- `kubectl` — useful aliases and completion helpers;
- `terraform` — quality-of-life improvements for IaC work;
- `aws` — useful if you use AWS frequently;
- `gh` — very useful for GitHub workflows;
- `python` and `pip` — useful if you touch Python tooling or automation;
- `vscode` — optional, but nice if you open projects from terminal;
- `fzf` — useful if installed and integrated.

## Plugins I would **not** recommend by default

- Too many cloud plugins at once if you only use one provider;
- legacy aliases you do not understand;
- plugin sets that overlap heavily and slow shell startup;
- prompt-related plugins when Starship already handles the prompt.

---

# Module 6. Install extra plugins that are not bundled with Oh My Zsh

## Install `zsh-autosuggestions`

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

## Install `zsh-syntax-highlighting`

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## Add them to the plugin list

Make sure `zsh-syntax-highlighting` is last:

```bash
plugins=(
  git
  docker
  docker-compose
  kubectl
  terraform
  aws
  gh
  python
  pip
  vscode
  fzf
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

That ordering matters because the syntax-highlighting project recommends that it be sourced last.

---

# Module 7. Build a clean `~/.zshrc`

Here is a practical example.

```bash
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME=""

plugins=(
  git
  docker
  docker-compose
  kubectl
  terraform
  aws
  gh
  python
  pip
  vscode
  fzf
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# Preferred editor
export EDITOR="code --wait"
export VISUAL="code --wait"

# PATH additions
export PATH="$HOME/.local/bin:$PATH"

# Better navigation
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh)"
fi

# direnv
if command -v direnv >/dev/null 2>&1; then
  eval "$(direnv hook zsh)"
fi

# fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Better defaults
alias ls="eza --icons"
alias ll="eza -la --icons --git"
alias cat="bat"

# Git shortcuts
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gca="git commit -a"
alias gp="git push"
alias gl="git pull"
alias gd="git diff"
alias gco="git checkout"
alias gcb="git checkout -b"

# Kubernetes shortcuts
alias k="kubectl"
alias kgp="kubectl get pods"
alias kgs="kubectl get svc"
alias kgd="kubectl get deploy"
alias kgn="kubectl get nodes"
alias kaf="kubectl apply -f"
alias kdf="kubectl delete -f"

# Terraform shortcuts
alias tf="terraform"
alias tfi="terraform init"
alias tfp="terraform plan"
alias tfa="terraform apply"
alias tfd="terraform destroy"

# Misc helpers
alias c="clear"
alias ..="cd .."
alias ...="cd ../.."

# Prompt
export STARSHIP_CONFIG="$HOME/.config/starship.toml"
eval "$(starship init zsh)"
```

---

# Module 8. Build a useful Starship config

The key principle is this:

Show context that helps decision-making, but hide noise.

For DevOps and software development, a prompt is most useful when it shows:

- current directory;
- Git branch and status;
- Kubernetes context only when relevant;
- cloud profile only when relevant;
- runtime version only when relevant;
- command duration if something was slow.

## Example `~/.config/starship.toml`

```toml
add_newline = true
command_timeout = 1000
format = "$directory$git_branch$git_status$docker_context$kubernetes$aws$gcloud$azure$terraform$python$nodejs$golang$rust$cmd_duration$line_break$character"

[directory]
truncation_length = 4
truncate_to_repo = true

[git_branch]
symbol = " "

[git_status]
stashed = "📦 "
modified = "!"
staged = "+"
untracked = "?"
renamed = "»"
deleted = "✘"

[cmd_duration]
min_time = 2000
format = "took [$duration]($style) "

[kubernetes]
disabled = false
format = 'on [k8s:$context( \\($namespace\\))]($style) '

[aws]
disabled = false
format = 'on [aws:$profile]($style) '

[gcloud]
disabled = false
format = 'on [gcp:$account(@$domain)]($style) '

[azure]
disabled = false
format = 'on [az:$subscription]($style) '

[terraform]
disabled = false
format = 'via [tf:$workspace]($style) '

[python]
python_binary = ["python3", "python"]
format = 'via [py:${pyenv_prefix}(${version} )(\\($virtualenv\\) )]($style)'

[nodejs]
format = 'via [node:$version]($style) '

[golang]
format = 'via [go:$version]($style) '

[rust]
format = 'via [rs:$version]($style) '

[character]
success_symbol = "❯"
error_symbol = "✗"
vimcmd_symbol = "❮"
```

This prompt stays informative without turning into a dashboard.

---

# Module 9. Add DevOps helper functions

Aliases are good, but a few functions are even better.

Add these to `~/.zshrc`:

```bash
mkcd() {
  mkdir -p "$1" && cd "$1"
}

kctxs() {
  kubectx
}

kns() {
  kubens
}

klogs() {
  kubectl logs -f "$1"
}

kgpa() {
  kubectl get pods -A
}

tfclean() {
  rm -rf .terraform .terraform.lock.hcl
}

gst() {
  git status --short --branch
}

glg() {
  git log --oneline --graph --decorate -20
}
```

---

# Module 10. Recommended productivity tools around this stack

These are not all shell plugins, but they fit the workflow extremely well.

## `bat`

A better `cat` with syntax highlighting.

## `eza`

A modern replacement for `ls`.

## `fd`

A faster and friendlier `find`.

## `ripgrep`

Fast text search across repos.

## `jq` and `yq`

Essential for JSON and YAML processing.

## `lazygit`

A very good terminal UI for Git operations.

## `k9s`

One of the highest-value tools for Kubernetes work.

---

# Module 11. How to verify everything works

## Check shell

```bash
echo $SHELL
zsh --version
```

## Check Oh My Zsh

```bash
ls ~/.oh-my-zsh
```

## Check Starship

```bash
starship --version
```

## Check Ghostty config is applied

Open a new Ghostty window and verify:

- font is correct;
- symbols render correctly;
- theme is correct;
- shell opens in Zsh;
- prompt looks like Starship, not like an Oh My Zsh theme.

## Check plugins and tools

```bash
which zoxide
which fzf
which kubectl
which terraform
which rg
which fd
which bat
```

## Check autosuggestions and syntax highlighting

- start typing an old command and confirm suggestion appears;
- type a wrong command and confirm highlighting changes;
- type a valid command and confirm it looks correct.

---

# Module 12. Common mistakes and how to fix them

## Problem 1. Prompt looks broken or symbols are weird

Cause:

- Nerd Font is not installed or not selected in Ghostty.

Fix:

- install a Nerd Font;
- set that font in Ghostty config;
- reopen the terminal.

## Problem 2. Starship and Oh My Zsh theme conflict

Cause:

- `ZSH_THEME` is set to a real theme.

Fix:

```bash
ZSH_THEME=""
```

## Problem 3. `zsh-syntax-highlighting` does not work correctly

Cause:

- it is not loaded last.

Fix:

- move `zsh-syntax-highlighting` to the end of the plugin list.

## Problem 4. `zoxide` plugin says command not found

Cause:

- binary is installed in a path that is not available early enough.

Fix:

- ensure `~/.local/bin` or your package manager path is in `PATH` before plugin initialization.

## Problem 5. Shell startup feels slow

Cause:

- too many plugins;
- duplicate initialization;
- loading heavy tools you rarely use.

Fix:

- remove unused plugins;
- avoid overlapping prompt systems;
- keep only daily-driver tools in shell startup.

---

# Module 13. Recommended final setup profile

If you want a strong default stack without overengineering it, this is a very good starting point:

## Base stack

- Ghostty
- Zsh
- Oh My Zsh
- Starship

## Core plugins

- git
- kubectl
- terraform
- docker
- aws
- gh
- fzf
- zsh-autosuggestions
- zsh-syntax-highlighting

## Core CLI tools

- zoxide
- fzf
- eza
- bat
- fd
- ripgrep
- jq
- yq
- lazygit
- k9s
- direnv

This is enough for the majority of DevOps and software engineering workflows.

---

# Module 14. Suggested demo flow for a YouTube video

## Intro hook

"In this video I will show you how to build a terminal setup that looks modern, stays fast, and actually helps in real DevOps and development work. We will configure Ghostty, Oh My Zsh, Starship, and the plugins that are truly worth installing."

## Demo sequence

1. Show the final result first
2. Explain why this stack is better than random theme collections
3. Install the tools
4. Configure Ghostty
5. Configure Oh My Zsh
6. Enable Starship
7. Add plugins
8. Add aliases and functions
9. Show Git, Kubernetes, Terraform, and cloud examples
10. Show common breakages and fixes

## Good closing message

"The best shell setup is not the most beautiful one. It is the one that helps you move faster every day without getting in your way."

---

# Final result

After completing this guide, you will have a terminal environment that is:

- modern;
- readable;
- fast enough for daily heavy use;
- practical for Git, containers, Kubernetes, Terraform, and cloud work;
- easy to reproduce on another machine;
- clean enough to keep in a GitHub repo as dotfiles.

This is a strong baseline. From here, you can evolve the setup for your own workflow instead of starting from chaos.

---

# References

- Ghostty documentation
- Oh My Zsh documentation
- Starship documentation
- zoxide documentation
- direnv documentation
- zsh-autosuggestions documentation
- zsh-syntax-highlighting documentation
- fzf documentation
