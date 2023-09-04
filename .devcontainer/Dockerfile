FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

RUN echo 'export PNPM_HOME="/home/node/.local/share/pnpm"' >> /home/node/.bashrc && \
    echo 'case ":$PATH:" in' >> /home/node/.bashrc && \
    echo '  *":$PNPM_HOME:"*) ;;' >> /home/node/.bashrc && \
    echo '  *) export PATH="$PNPM_HOME:$PATH" ;;' >> /home/node/.bashrc && \
    echo 'esac' >> /home/node/.bashrc

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
