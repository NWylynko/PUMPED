FROM node:14

# Install Zsh, Oh-My-Zsh and plugins
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
  -p https://github.com/zsh-users/zsh-autosuggestions \
  -p https://github.com/zsh-users/zsh-completions \
  -p https://github.com/zsh-users/zsh-history-substring-search \
  -p https://github.com/zdharma/fast-syntax-highlighting

# copy accross profile
COPY .zshrc .p10k.zsh /root/