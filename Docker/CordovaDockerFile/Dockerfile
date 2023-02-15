FROM ubuntu:22.04

# base
RUN apt-get update \
    && apt-get install curl wget unzip sudo nano iputils-ping gcc g++ make apt-transport-https -yq

# java
RUN apt-get install openjdk-18-jdk-headless -yq

ENV JAVA_HOME /usr/lib/jvm/java-18-openjdk-amd64

# gradle, ant et maven
RUN wget -c https://services.gradle.org/distributions/gradle-7.4.2-bin.zip -P /tmp \
    && unzip -d /opt/gradle /tmp/gradle-7.4.2-bin.zip \
    && apt-get install -y maven ant -yq

ENV ANDROID_SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-9123335_latest.zip" \
    ANDROID_BUILD_TOOLS_VERSION=33.0.1 \
    ANT_HOME="/usr/share/ant" \
    MAVEN_HOME="/usr/share/maven" \
    GRADLE_HOME="/opt/gradle/gradle-7.4.2" \
    ANDROID_SDK_ROOT="/opt/android" \
    ANDROID_HOME="/opt/android/"

ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/build-tools/$ANDROID_BUILD_TOOLS_VERSION:$ANT_HOME/bin:$MAVEN_HOME/bin:$GRADLE_HOME/bin

# Installs Android SDK
WORKDIR /opt

RUN mkdir android && cd android && \
    wget -O tools.zip ${ANDROID_SDK_URL} && \
    unzip tools.zip && rm tools.zip && \
    cd cmdline-tools && \
    mkdir latest && \
    ls | grep -v latest | xargs mv -t latest

RUN mkdir /root/.android && touch /root/.android/repositories.cfg && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platform-tools" "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platform-tools" "build-tools;28.0.0" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platform-tools" "build-tools;30.0.3" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platform-tools" "build-tools;32.0.0" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platforms;android-28" "platforms;android-29" "platforms;android-30" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platforms;android-31" "platforms;android-32" "platforms;android-33" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "extras;android;m2repository" "extras;google;google_play_services" "extras;google;instantapps" "extras;google;m2repository" &&  \
    while true; do echo 'y'; sleep 2; done | sdkmanager "add-ons;addon-google_apis-google-22" "add-ons;addon-google_apis-google-23" "add-ons;addon-google_apis-google-24" "skiaparser;1" "skiaparser;2" "skiaparser;3"

RUN chmod a+x -R $ANDROID_SDK_ROOT \
    && chown -R root:root $ANDROID_SDK_ROOT \
    && rm -rf /opt/android/licenses \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# node.js, npm et cordova
RUN apt update \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@9.2.0 \
    && npm install -g --unsafe-perm cordova@11.0.0 \
    && apt-get autoremove -y \
    && apt-get clean

WORKDIR /

# projet
RUN cordova create mobile-app re.tibillet.tibilletmobile TibilletMobile \
    && cd mobile-app \
    && cordova plugin add cordova-plugin-android-permissions \
    && cordova plugin add cordova-plugin-device \
    && cordova plugin add phonegap-nfc \
    && cordova plugin add cordova-plugin-network-information \
    && cordova platform add android@11.0.0 \
    && cordova platform add browser@6.0.0

WORKDIR /mobile-app
