# Ghostty + Oh My Zsh + Starship для DevOps и разработки ПО

Практический мини-курс по созданию быстрого, чистого и продуктивного терминального окружения.

---

## Для кого этот курс

Эта конфигурация хорошо подойдёт, если вы много времени проводите в терминале и хотите получить:

- современный эмулятор терминала;
- shell, удобный для ежедневной работы;
- prompt, который остаётся быстрым, но показывает полезный контекст;
- плагины, помогающие с Git, Kubernetes, Docker, Terraform, облачными CLI и общей разработкой.

Это руководство намеренно сделано практичным. Цель не в том, чтобы установить все популярные плагины подряд. Цель в том, чтобы собрать окружение, которым приятно пользоваться каждый день и которое не становится медленным, шумным или хрупким.

---

## Что вы соберёте

К концу этого мини-курса у вас будут:

- **Ghostty** как эмулятор терминала;
- **Zsh** как shell;
- **Oh My Zsh** как фреймворк для shell;
- **Starship** как prompt;
- аккуратно подобранный набор плагинов и инструментов для DevOps и разработки ПО;
- чистый `~/.zshrc` и простой `starship.toml`, которые можно хранить в Git.

---

## Почему этот стек стоит использовать

### 1. Ghostty даёт современный терминал

Ghostty — это быстрый GPU-ускоренный эмулятор терминала с нативным UI и встроенной интеграцией с shell. Он ощущается современно, хорошо поддерживает темы и является сильным выбором, если вам нужен отполированный терминал без ухода в чрезмерно навязанный workflow.

### 2. Oh My Zsh упрощает сопровождение Zsh

Zsh сам по себе мощный, но Oh My Zsh даёт практичную структуру для алиасов, плагинов, автодополнения и общих улучшений качества жизни в shell.

### 3. Для многих Starship лучше тяжёлых shell-тем

Вместо огромного фреймворка тем для shell Starship даёт prompt, который быстрый, переносимый и проще в понимании. Он также одинаково предсказуемо работает на разных машинах и в разных shell.

### 4. Этот стек хорошо масштабируется

Он подходит для:

- разработчиков приложений;
- DevOps- и platform-инженеров;
- SRE;
- cloud-инженеров;
- людей, которые переключаются между macOS и Linux.

---

## Структура курса

1. Установить базовые инструменты
2. Настроить Ghostty
3. Установить и настроить Oh My Zsh
4. Установить Starship
5. Добавить полезные плагины и CLI-инструменты
6. Собрать чистый `~/.zshrc`
7. Собрать полезный `starship.toml`
8. Добавить DevOps-алиасы и вспомогательные функции
9. Проверить итоговый результат
10. Разобрать типичные проблемы

---

# Модуль 1. Установка базовых инструментов

## Пример для macOS с Homebrew

```bash
brew install ghostty zsh starship \
  zoxide fzf eza bat fd ripgrep jq yq direnv \
  kubectl kubectx k9s terraform lazygit
```

В зависимости от вашего workflow вам также могут понадобиться:

```bash
brew install helm docker-compose awscli azure-cli google-cloud-sdk
```

## Linux

Устанавливайте те же инструменты через пакетный менеджер вашего дистрибутива там, где это возможно. Для Ghostty отдельно проверьте официальную страницу установки, потому что официальные предсобранные пакеты распространяются для macOS, а доступность под Linux зависит от сопровождающих дистрибутива и community-пакетов.

---

# Модуль 2. Настройка Ghostty

## Почему Ghostty важен в этом сетапе

Ghostty — это не просто приложение, которое открывает ваш shell. Он влияет на:

- рендеринг шрифтов;
- сочетания клавиш;
- интеграцию с shell;
- согласованность темы;
- отзывчивость терминала.

## Рекомендуемые первые шаги

### 1. Включите хороший шрифт для программирования

Используйте Nerd Font, если хотите, чтобы символы Starship отображались корректно.

Хорошие варианты:

- JetBrainsMono Nerd Font
- FiraCode Nerd Font
- MesloLGS Nerd Font

### 2. Включите shell integration в Ghostty

Ghostty поддерживает интеграцию с shell и может автоматически подключать её для shell, включая Zsh. Это улучшает некоторые функции терминала и делает работу в нём более отполированной.

### 3. Выберите простую тему

Не усложняйте визуальный слой в самом начале. Хороший UX терминала больше зависит от отступов, контраста, читаемого размера шрифта и полезного содержимого prompt, чем от сложных цветовых трюков.

## Пример конфигурации Ghostty

Типичное расположение конфига:

- macOS: `~/.config/ghostty/config`
- Linux: `~/.config/ghostty/config`

Пример:

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

Держите этот файл минималистичным. У Ghostty большой справочник по конфигурации, но настраивать всё подряд не нужно.

---

# Модуль 3. Установка и настройка Oh My Zsh

## Установите Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Это создаст базовый `~/.zshrc` и настроит структуру фреймворка.

## Важный принцип

Используйте Oh My Zsh для структуры и плагинов, но **не** опирайтесь на тяжёлую prompt-тему из Oh My Zsh, если уже используете Starship.

Установите:

```bash
ZSH_THEME=""
```

Это предотвращает конфликты тем и сохраняет поведение prompt чистым.

---

# Модуль 4. Установка Starship

## Почему Starship вместо темы Oh My Zsh

Потому что Starship:

- быстрый;
- кросс-shell;
- легко версионируется в Git;
- модульный;
- намного проще переносится между машинами.

## Включите Starship в Zsh

Добавьте это ближе к концу `~/.zshrc`:

```bash
eval "$(starship init zsh)"
```

## Создайте файл конфигурации

```bash
mkdir -p ~/.config
touch ~/.config/starship.toml
```

---

# Модуль 5. Добавьте правильные плагины и инструменты

Это самый важный раздел.

Хороший shell-сетап — это не про установку пятидесяти плагинов. Это про выбор инструментов, которые убирают трение из ежедневной работы.

## Базовый набор плагинов

### 1. `git`

Плагин `git` из Oh My Zsh почти обязателен. Он даёт полезные алиасы и хелперы для повседневной работы с Git.

### 2. `zsh-autosuggestions`

Подсказывает команды из вашей истории по мере набора. Крайне полезно для повторяющейся работы в терминале.

### 3. `zsh-syntax-highlighting`

Подсвечивает валидные и невалидные команды до выполнения. Это особенно полезно при работе с длинными shell-командами, командами Kubernetes, SSH-командами и потенциально разрушительными операциями.

### 4. `fzf`

Fuzzy finder, который становится полезным почти везде:

- поиск файлов;
- поиск по истории;
- навигация по репозиториям;
- интерактивный выбор.

### 5. `zoxide`

Более умный `cd`. Со временем это становится одним из инструментов с наибольшей отдачей в shell.

### 6. `direnv`

Автоматически подгружает переменные окружения для каждой директории проекта. Очень полезно для облачных учётных данных, языковых рантаймов, локальных сервисов и конфигурации на уровне проекта.

---

## Хорошие плагины Oh My Zsh для DevOps и разработки

Включайте только те, которыми реально пользуетесь.

Рекомендуемый набор:

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

### Примечания к этому списку

- `git` — обязательный;
- `docker` и `docker-compose` — полезны, если вы локально работаете с контейнерами;
- `kubectl` — полезные алиасы и помощники для completion;
- `terraform` — улучшения качества жизни для IaC-работы;
- `aws` — полезен, если вы часто используете AWS;
- `gh` — очень полезен для workflow с GitHub;
- `python` и `pip` — полезны, если вы касаетесь Python-инструментов или автоматизации;
- `vscode` — опционально, но удобно, если вы открываете проекты из терминала;
- `fzf` — полезен, если установлен и интегрирован.

## Плагины, которые я **не** рекомендую по умолчанию

- слишком много облачных плагинов сразу, если вы используете только одного провайдера;
- legacy-алиасы, которые вы не понимаете;
- наборы плагинов, которые сильно перекрываются и замедляют старт shell;
- плагины, связанные с prompt, если Starship уже управляет prompt.

---

# Модуль 6. Установите дополнительные плагины, которые не входят в Oh My Zsh

## Установка `zsh-autosuggestions`

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

## Установка `zsh-syntax-highlighting`

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## Добавьте их в список плагинов

Убедитесь, что `zsh-syntax-highlighting` стоит последним:

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

Порядок здесь важен, потому что проект syntax-highlighting рекомендует подключать его последним.

---

# Модуль 7. Соберите чистый `~/.zshrc`

Вот практический пример.

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

# Предпочтительный редактор
export EDITOR="code --wait"
export VISUAL="code --wait"

# Дополнения к PATH
export PATH="$HOME/.local/bin:$PATH"

# Лучшая навигация
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh)"
fi

# direnv
if command -v direnv >/dev/null 2>&1; then
  eval "$(direnv hook zsh)"
fi

# fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Улучшенные значения по умолчанию
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

# Разные помощники
alias c="clear"
alias ..="cd .."
alias ...="cd ../.."

# Prompt
export STARSHIP_CONFIG="$HOME/.config/starship.toml"
eval "$(starship init zsh)"
```

---

# Модуль 8. Соберите полезную конфигурацию Starship

Ключевой принцип такой:

Показывайте контекст, который помогает принимать решения, но скрывайте шум.

Для DevOps и разработки prompt наиболее полезен, когда показывает:

- текущую директорию;
- Git-ветку и статус;
- Kubernetes-контекст только когда это действительно важно;
- облачный профиль только когда это действительно важно;
- версию рантайма только когда это действительно важно;
- длительность команды, если что-то выполнялось медленно.

## Пример `~/.config/starship.toml`

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

Такой prompt остаётся информативным, не превращаясь в дашборд.

---

# Модуль 9. Добавьте DevOps-вспомогательные функции

Алиасы хороши, но несколько функций ещё лучше.

Добавьте это в `~/.zshrc`:

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

# Модуль 10. Рекомендуемые инструменты продуктивности вокруг этого стека

Это не только shell-плагины, но они очень хорошо ложатся в этот workflow.

## `bat`

Улучшенный `cat` с подсветкой синтаксиса.

## `eza`

Современная замена `ls`.

## `fd`

Более быстрый и удобный `find`.

## `ripgrep`

Быстрый поиск текста по репозиториям.

## `jq` и `yq`

Незаменимы для обработки JSON и YAML.

## `lazygit`

Очень хороший терминальный UI для Git-операций.

## `k9s`

Один из самых ценных инструментов для работы с Kubernetes.

---

# Модуль 11. Как проверить, что всё работает

## Проверьте shell

```bash
echo $SHELL
zsh --version
```

## Проверьте Oh My Zsh

```bash
ls ~/.oh-my-zsh
```

## Проверьте Starship

```bash
starship --version
```

## Проверьте, что конфиг Ghostty применился

Откройте новое окно Ghostty и убедитесь, что:

- шрифт корректный;
- символы отображаются корректно;
- тема корректная;
- shell открывается в Zsh;
- prompt выглядит как Starship, а не как тема Oh My Zsh.

## Проверьте плагины и инструменты

```bash
which zoxide
which fzf
which kubectl
which terraform
which rg
which fd
which bat
```

## Проверьте autosuggestions и syntax highlighting

- начните набирать старую команду и убедитесь, что появляется подсказка;
- введите неверную команду и убедитесь, что подсветка меняется;
- введите корректную команду и убедитесь, что она выглядит правильно.

---

# Модуль 12. Частые ошибки и как их исправить

## Проблема 1. Prompt выглядит сломанным или символы странные

Причина:

- Nerd Font не установлен или не выбран в Ghostty.

Исправление:

- установите Nerd Font;
- укажите этот шрифт в конфиге Ghostty;
- заново откройте терминал.

## Проблема 2. Конфликт между Starship и темой Oh My Zsh

Причина:

- `ZSH_THEME` указывает на реальную тему.

Исправление:

```bash
ZSH_THEME=""
```

## Проблема 3. `zsh-syntax-highlighting` работает некорректно

Причина:

- он подключён не последним.

Исправление:

- переместите `zsh-syntax-highlighting` в конец списка плагинов.

## Проблема 4. Плагин `zoxide` пишет command not found

Причина:

- бинарник установлен в путь, который недоступен достаточно рано.

Исправление:

- убедитесь, что `~/.local/bin` или путь вашего пакетного менеджера находится в `PATH` до инициализации плагинов.

## Проблема 5. Shell запускается медленно

Причина:

- слишком много плагинов;
- дублирующаяся инициализация;
- загрузка тяжёлых инструментов, которыми вы редко пользуетесь.

Исправление:

- удалите неиспользуемые плагины;
- избегайте перекрывающихся систем prompt;
- оставьте в старте shell только ежедневные инструменты.

---

# Модуль 13. Рекомендуемый итоговый профиль настройки

Если вам нужен сильный дефолтный стек без избыточного overengineering, это очень хорошая стартовая точка:

## Базовый стек

- Ghostty
- Zsh
- Oh My Zsh
- Starship

## Базовые плагины

- git
- kubectl
- terraform
- docker
- aws
- gh
- fzf
- zsh-autosuggestions
- zsh-syntax-highlighting

## Базовые CLI-инструменты

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

Этого достаточно для большинства workflow в DevOps и software engineering.

---

# Модуль 14. Предлагаемый сценарий демо для YouTube-видео

## Хук для вступления

"В этом видео я покажу, как собрать терминальное окружение, которое выглядит современно, остаётся быстрым и реально помогает в настоящей работе по DevOps и разработке. Мы настроим Ghostty, Oh My Zsh, Starship и только те плагины, которые действительно стоят установки."

## Последовательность демо

1. Сначала покажите финальный результат
2. Объясните, почему этот стек лучше случайной коллекции тем
3. Установите инструменты
4. Настройте Ghostty
5. Настройте Oh My Zsh
6. Включите Starship
7. Добавьте плагины
8. Добавьте алиасы и функции
9. Покажите примеры с Git, Kubernetes, Terraform и облаками
10. Покажите типичные поломки и исправления

## Хорошее заключительное сообщение

"Лучший shell-сетап — не самый красивый. Лучший shell-сетап — тот, который помогает вам двигаться быстрее каждый день и не мешает работать."

---

# Итоговый результат

После прохождения этого руководства у вас будет терминальное окружение, которое:

- современное;
- читаемое;
- достаточно быстрое для тяжёлой ежедневной работы;
- практичное для Git, контейнеров, Kubernetes, Terraform и облачной работы;
- легко воспроизводится на другой машине;
- достаточно чистое, чтобы хранить его в GitHub-репозитории как dotfiles.

Это сильная базовая точка. Дальше вы сможете развивать сетап под свой workflow, а не начинать из хаоса.

---

# Ссылки

- документация Ghostty
- документация Oh My Zsh
- документация Starship
- документация zoxide
- документация direnv
- документация zsh-autosuggestions
- документация zsh-syntax-highlighting
- документация fzf
