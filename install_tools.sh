#!/bin/bash

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

if command_exists node; then
    echo "Node.js is already installed."
else
    echo "Node.js is not installed. Installing Node.js..."

    if command_exists nvm; then
        echo "nvm is already installed. Using nvm to install Node.js."
    else
        echo "nvm is not installed. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \ . "$NVM_DIR/nvm.sh"
    fi

    echo "Installing the latest Node.js LTS version..."
    nvm install --lts
fi

node -v

if npm list -g @go-task/cli >/dev/null 2>&1; then
    echo "@go-task/cli is already installed."
else
    echo "Installing @go-task/cli globally..."
    npm install -g @go-task/cli
fi


echo "Installed versions:"
node -v
npm -v
task --version 
