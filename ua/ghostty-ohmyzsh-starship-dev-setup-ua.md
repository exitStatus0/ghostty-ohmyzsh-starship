# Ghostty + Oh My Zsh + Starship для DevOps та розробки ПЗ

Практичний міні-курс зі створення швидкого, чистого та продуктивного налаштування терміналу.

---

## Для кого цей курс

Це налаштування чудово підходить, якщо ви багато часу проводите в терміналі і хочете:

- сучасний термінальний емулятор;
- зручний shell для щоденної роботи;
- швидкий prompt, що показує корисний контекст;
- плагіни для Git, Kubernetes, Docker, Terraform, хмарних CLI та загальної розробки.

Цей гайд навмисно практичний. Мета — не встановити кожен популярний плагін. Мета — зібрати налаштування, яке зручно використовувати щодня і яке не стане повільним, галасливим або нестабільним.

---

## Що ви зберете

По завершенні цього міні-курсу у вас буде:

- **Ghostty** як термінальний емулятор;
- **Zsh** як shell;
- **Oh My Zsh** як фреймворк для shell;
- **Starship** як prompt;
- ретельно підібраний набір плагінів та інструментів для DevOps та розробки;
- чистий `~/.zshrc` та простий `starship.toml`, який можна зберігати в Git.

---

## Чому цей стек варто використовувати

### 1. Ghostty дає сучасний термінал

Ghostty — це швидкий, GPU-прискорений термінальний емулятор із нативним UI та вбудованою інтеграцією shell. Він відчувається сучасним, добре підтримує теми і є відмінним вибором, якщо ви хочете відполірований термінал без вузькоспеціалізованого підходу.

### 2. Oh My Zsh спрощує управління Zsh

Zsh потужний сам по собі, але Oh My Zsh надає практичну структуру для аліасів, плагінів, автодоповнень і загального покращення якості роботи в shell.

### 3. Starship краще за важкі теми shell для багатьох людей

Замість великого фреймворку тем shell, Starship надає prompt, який є швидким, переносимим та зрозумілим. Він також стабільно працює на різних машинах та оболонках.

### 4. Цей стек добре масштабується

Він підходить для:

- розробників застосунків;
- DevOps та platform engineers;
- SRE;
- cloud engineers;
- людей, які перемикаються між macOS та Linux.

---

## Структура курсу

1. Встановлення базових інструментів
2. Налаштування Ghostty
3. Встановлення та налаштування Oh My Zsh
4. Встановлення Starship
5. Додавання цінних плагінів та CLI-інструментів
6. Створення чистого `~/.zshrc`
7. Створення корисного `starship.toml`
8. Додавання DevOps-аліасів та допоміжних функцій
9. Перевірка фінального результату
10. Усунення типових проблем

---

# Модуль 1. Встановлення базових інструментів

## macOS — приклад із Homebrew

```bash
brew install ghostty zsh starship \
  zoxide fzf eza bat fd ripgrep jq yq direnv \
  kubectl kubectx k9s terraform lazygit
```

Залежно від вашого workflow, вам також можуть знадобитися:

```bash
brew install helm docker-compose awscli azure-cli google-cloud-sdk
```

## Linux

Встановлюйте ті самі інструменти за допомогою менеджера пакетів вашого дистрибутива. Для Ghostty зокрема, перевірте офіційну сторінку встановлення, оскільки офіційні зібрані пакети розповсюджуються для macOS, тоді як доступність для Linux залежить від мейнтейнерів дистрибутива та спільноти.

---

# Модуль 2. Налаштування Ghostty

## Чому Ghostty важливий у цьому налаштуванні

Ghostty — це не просто застосунок, що відкриває ваш shell. Він впливає на:

- відтворення шрифтів;
- прив'язки клавіш;
- інтеграцію з shell;
- узгодженість теми;
- швидкість відгуку терміналу.

## Рекомендовані перші кроки

### 1. Увімкніть хороший шрифт для програмування

Використовуйте Nerd Font, якщо хочете, щоб символи Starship відображалися коректно.

Хороші варіанти:

- JetBrainsMono Nerd Font
- FiraCode Nerd Font
- MesloLGS Nerd Font

### 2. Увімкніть інтеграцію Ghostty з shell

Ghostty підтримує інтеграцію з shell і може автоматично вбудовувати її для оболонок, включаючи Zsh. Це покращує деякі функції терміналу та робить його більш відполірованим.

### 3. Виберіть просту тему

Не ускладнюйте візуальний рівень на початку. Хороший UX терміналу більше залежить від відступів, контрастності, читабельного розміру шрифту та корисного вмісту prompt, ніж від складних кольорових трюків.

## Приклад конфігурації Ghostty

Типове розташування конфігурації:

- macOS: `~/.config/ghostty/config`
- Linux: `~/.config/ghostty/config`

Приклад:

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

Тримайте цей файл мінімальним. У Ghostty велика довідка з конфігурації, але вам не потрібно налаштовувати все.

---

# Модуль 3. Встановлення та налаштування Oh My Zsh

## Встановлення Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Це створює ваш базовий `~/.zshrc` та налаштовує структуру фреймворку.

## Важливий принцип

Використовуйте Oh My Zsh для структури та плагінів, але **не** покладайтеся на важку тему prompt з Oh My Zsh, якщо ви вже використовуєте Starship.

Встановіть:

```bash
ZSH_THEME=""
```

Це запобігає конфліктам тем і зберігає чисту поведінку prompt.

---

# Модуль 4. Встановлення Starship

## Чому Starship замість теми Oh My Zsh

Тому що Starship є:

- швидким;
- cross-shell;
- легко версіонується в Git;
- модульним;
- набагато простіше переноситься між машинами.

## Увімкнення Starship у Zsh

Додайте це ближче до кінця `~/.zshrc`:

```bash
eval "$(starship init zsh)"
```

## Створення файлу конфігурації

```bash
mkdir -p ~/.config
touch ~/.config/starship.toml
```

---

# Модуль 5. Додавання правильних плагінів та інструментів

Це найважливіший розділ.

Хороше налаштування shell — це не встановлення п'ятдесяти плагінів. Це підбір інструментів, які усувають тертя в щоденній роботі.

## Основний набір плагінів

### 1. `git`

Плагін `git` для Oh My Zsh майже обов'язковий. Він надає корисні аліаси та помічники для щоденної роботи з Git.

### 2. `zsh-autosuggestions`

Пропонує команди з вашої історії під час введення. Надзвичайно корисно для повторюваної роботи в терміналі.

### 3. `zsh-syntax-highlighting`

Виділяє коректні та некоректні команди перед виконанням. Це особливо корисно при роботі з довгими командами shell, Kubernetes-командами, SSH-командами та деструктивними операціями.

### 4. `fzf`

Нечіткий пошук, який стає корисним майже скрізь:

- пошук файлів;
- пошук в історії;
- навігація по репозиторіях;
- інтерактивний вибір.

### 5. `zoxide`

Розумніший `cd`. З часом стає одним із інструментів із найвищою рентабельністю в shell.

### 6. `direnv`

Автоматично завантажує змінні середовища для кожної директорії проєкту. Дуже корисно для хмарних облікових даних, мовних рантаймів, локальних сервісів та конфігурації для окремих проєктів.

---

## Хороші плагіни Oh My Zsh для DevOps та розробки

Вмикайте тільки ті, якими ви дійсно користуєтеся.

Рекомендований набір:

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

### Нотатки до цього списку

- `git` — обов'язковий;
- `docker` та `docker-compose` — корисні, якщо ви працюєте з контейнерами локально;
- `kubectl` — корисні аліаси та помічники для автодоповнення;
- `terraform` — покращення якості роботи для IaC;
- `aws` — корисно, якщо ви часто використовуєте AWS;
- `gh` — дуже корисно для GitHub-робочих процесів;
- `python` та `pip` — корисно, якщо ви торкаєтеся Python-інструментів або автоматизації;
- `vscode` — опціонально, але зручно, якщо ви відкриваєте проєкти з терміналу;
- `fzf` — корисно, якщо встановлено та інтегровано.

## Плагіни, які я **не рекомендую** за замовчуванням

- Забагато хмарних плагінів одночасно, якщо ви використовуєте лише одного провайдера;
- застарілі аліаси, які ви не розумієте;
- набори плагінів, що сильно перетинаються та сповільнюють запуск shell;
- пов'язані з prompt плагіни, якщо Starship вже обробляє prompt.

---

# Модуль 6. Встановлення додаткових плагінів, що не входять до Oh My Zsh

## Встановлення `zsh-autosuggestions`

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

## Встановлення `zsh-syntax-highlighting`

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## Додавання їх до списку плагінів

Переконайтеся, що `zsh-syntax-highlighting` стоїть останнім:

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

Порядок важливий, оскільки проєкт syntax-highlighting рекомендує, щоб він підключався останнім.

---

# Модуль 7. Створення чистого `~/.zshrc`

Ось практичний приклад.

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

# Улюблений редактор
export EDITOR="code --wait"
export VISUAL="code --wait"

# Додатки до PATH
export PATH="$HOME/.local/bin:$PATH"

# Краща навігація
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh)"
fi

# direnv
if command -v direnv >/dev/null 2>&1; then
  eval "$(direnv hook zsh)"
fi

# fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Кращі стандартні налаштування
alias ls="eza --icons"
alias ll="eza -la --icons --git"
alias cat="bat"

# Скорочення для Git
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gca="git commit -a"
alias gp="git push"
alias gl="git pull"
alias gd="git diff"
alias gco="git checkout"
alias gcb="git checkout -b"

# Скорочення для Kubernetes
alias k="kubectl"
alias kgp="kubectl get pods"
alias kgs="kubectl get svc"
alias kgd="kubectl get deploy"
alias kgn="kubectl get nodes"
alias kaf="kubectl apply -f"
alias kdf="kubectl delete -f"

# Скорочення для Terraform
alias tf="terraform"
alias tfi="terraform init"
alias tfp="terraform plan"
alias tfa="terraform apply"
alias tfd="terraform destroy"

# Різні помічники
alias c="clear"
alias ..="cd .."
alias ...="cd ../.."

# Prompt
export STARSHIP_CONFIG="$HOME/.config/starship.toml"
eval "$(starship init zsh)"
```

---

# Модуль 8. Створення корисної конфігурації Starship

Ключовий принцип такий:

Показуйте контекст, що допомагає приймати рішення, але приховуйте шум.

Для DevOps та розробки ПЗ prompt найбільш корисний, коли показує:

- поточну директорію;
- гілку Git та статус;
- контекст Kubernetes тільки коли це актуально;
- хмарний профіль тільки коли це актуально;
- версію рантайму тільки коли це актуально;
- тривалість команди, якщо щось було повільним.

## Приклад `~/.config/starship.toml`

```toml
add_newline = true
command_timeout = 1000
format = "$directory$git_branch$git_status$docker_context$kubernetes$aws$gcloud$azure$terraform$python$nodejs$golang$rust$cmd_duration$line_break$character"

[directory]
truncation_length = 4
truncate_to_repo = true

[git_branch]
symbol = " "

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

Цей prompt залишається інформативним, не перетворюючись на дашборд.

---

# Модуль 9. Додавання DevOps-допоміжних функцій

Аліаси — це добре, але кілька функцій навіть краще.

Додайте їх до `~/.zshrc`:

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

# Модуль 10. Рекомендовані інструменти продуктивності для цього стеку

Це не всі плагіни shell, але вони чудово вписуються в workflow.

## `bat`

Кращий `cat` із підсвічуванням синтаксису.

## `eza`

Сучасна заміна для `ls`.

## `fd`

Швидший та зручніший `find`.

## `ripgrep`

Швидкий текстовий пошук по репозиторіях.

## `jq` та `yq`

Необхідні для обробки JSON та YAML.

## `lazygit`

Дуже хороший термінальний UI для операцій Git.

## `k9s`

Один із найцінніших інструментів для роботи з Kubernetes.

---

# Модуль 11. Як перевірити, що все працює

## Перевірка shell

```bash
echo $SHELL
zsh --version
```

## Перевірка Oh My Zsh

```bash
ls ~/.oh-my-zsh
```

## Перевірка Starship

```bash
starship --version
```

## Перевірка застосування конфігурації Ghostty

Відкрийте нове вікно Ghostty та переконайтеся:

- шрифт коректний;
- символи відображаються правильно;
- тема коректна;
- shell відкривається в Zsh;
- prompt виглядає як Starship, а не як тема Oh My Zsh.

## Перевірка плагінів та інструментів

```bash
which zoxide
which fzf
which kubectl
which terraform
which rg
which fd
which bat
```

## Перевірка автопідказок та підсвічування синтаксису

- почніть вводити стару команду та переконайтеся, що підказка з'являється;
- введіть неправильну команду та переконайтеся, що підсвічування змінюється;
- введіть коректну команду та переконайтеся, що вона виглядає правильно.

---

# Модуль 12. Типові помилки та як їх виправити

## Проблема 1. Prompt виглядає зламаним або символи відображаються неправильно

Причина:

- Nerd Font не встановлено або не вибрано в Ghostty.

Виправлення:

- встановіть Nerd Font;
- встановіть цей шрифт у конфігурації Ghostty;
- перезапустіть термінал.

## Проблема 2. Конфлікт між Starship та темою Oh My Zsh

Причина:

- `ZSH_THEME` встановлено на реальну тему.

Виправлення:

```bash
ZSH_THEME=""
```

## Проблема 3. `zsh-syntax-highlighting` не працює коректно

Причина:

- він не завантажується останнім.

Виправлення:

- перемістіть `zsh-syntax-highlighting` в кінець списку плагінів.

## Проблема 4. Плагін `zoxide` повідомляє "command not found"

Причина:

- бінарник встановлено в шлях, який недоступний достатньо рано.

Виправлення:

- переконайтеся, що `~/.local/bin` або шлях вашого менеджера пакетів є в `PATH` перед ініціалізацією плагінів.

## Проблема 5. Запуск shell відчувається повільним

Причина:

- забагато плагінів;
- дублюючі ініціалізації;
- завантаження важких інструментів, якими ви рідко користуєтеся.

Виправлення:

- видаліть невикористані плагіни;
- уникайте перекриваючихся систем prompt;
- тримайте в запуску shell тільки щоденні інструменти.

---

# Модуль 13. Рекомендований фінальний профіль налаштування

Якщо ви хочете сильний стандартний стек без надмірного ускладнення, це дуже хороша відправна точка:

## Базовий стек

- Ghostty
- Zsh
- Oh My Zsh
- Starship

## Основні плагіни

- git
- kubectl
- terraform
- docker
- aws
- gh
- fzf
- zsh-autosuggestions
- zsh-syntax-highlighting

## Основні CLI-інструменти

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

Цього достатньо для більшості DevOps та інженерних workflow.

---

# Модуль 14. Пропонований демо-flow для відео на YouTube

## Вступний хук

«У цьому відео я покажу, як зібрати налаштування терміналу, яке виглядає сучасно, залишається швидким і дійсно допомагає в реальній роботі DevOps та розробки. Ми налаштуємо Ghostty, Oh My Zsh, Starship та плагіни, які дійсно варто встановлювати.»

## Послідовність демо

1. Спочатку покажіть фінальний результат
2. Поясніть, чому цей стек кращий за випадкові колекції тем
3. Встановіть інструменти
4. Налаштуйте Ghostty
5. Налаштуйте Oh My Zsh
6. Увімкніть Starship
7. Додайте плагіни
8. Додайте аліаси та функції
9. Покажіть приклади Git, Kubernetes, Terraform та хмарні
10. Покажіть типові поломки та виправлення

## Гарне завершальне повідомлення

«Найкраще налаштування shell — це не найкрасивіше. Це те, що допомагає вам рухатися швидше щодня, не заважаючи вам.»

---

# Фінальний результат

Після завершення цього гайду у вас буде термінальне середовище, яке є:

- сучасним;
- читабельним;
- достатньо швидким для щоденного інтенсивного використання;
- практичним для Git, контейнерів, Kubernetes, Terraform та хмарної роботи;
- легким для відтворення на іншій машині;
- достатньо чистим, щоб зберігати в GitHub-репозиторії як dotfiles.

Це сильна базова точка. Звідси ви можете розвивати налаштування під власний workflow замість того, щоб починати з хаосу.

---

# Посилання

- Документація Ghostty
- Документація Oh My Zsh
- Документація Starship
- Документація zoxide
- Документація direnv
- Документація zsh-autosuggestions
- Документація zsh-syntax-highlighting
- Документація fzf
