// WebRTC module for live video streaming

class VideoChat {
    constructor() {
        this.localVideo = document.getElementById('localVideo');
        this.remoteVideo = document.getElementById('remoteVideo');
        this.startBtn = document.getElementById('startBtn');
        
        this.localStream = null;
        this.remoteStream = null;
        this.peerConnection = null;
        this.isInitiator = false;
        
        // STUN servers for NAT traversal
        this.pcConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startCall());
        
        // Check for WebRTC support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showError('WebRTC n\'est pas supporté par votre navigateur');
            return;
        }
        
        console.log('WebRTC module initialized');
    }
    
    async startCall() {
        try {
            this.startBtn.disabled = true;
            this.startBtn.textContent = 'Connexion en cours...';
            
            // Get user media
            await this.getUserMedia();
            
            // Create peer connection
            this.createPeerConnection();
            
            // Add local stream to peer connection
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });
            
            this.startBtn.textContent = 'Caméra activée';
            this.showSuccess('Caméra démarrée avec succès!');
            
        } catch (error) {
            console.error('Error starting call:', error);
            this.showError('Erreur lors du démarrage de la caméra: ' + error.message);
            this.startBtn.disabled = false;
            this.startBtn.textContent = 'Démarrer la caméra';
        }
    }
    
    async getUserMedia() {
        const constraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        };
        
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.localVideo.srcObject = this.localStream;
            
            console.log('Local stream obtained');
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                throw new Error('Accès à la caméra refusé. Veuillez autoriser l\'accès.');
            } else if (error.name === 'NotFoundError') {
                throw new Error('Aucune caméra trouvée sur cet appareil.');
            } else {
                throw new Error('Erreur d\'accès aux médias: ' + error.message);
            }
        }
    }
    
    createPeerConnection() {
        this.peerConnection = new RTCPeerConnection(this.pcConfig);
        
        // Handle remote stream
        this.peerConnection.ontrack = (event) => {
            console.log('Remote stream received');
            this.remoteStream = event.streams[0];
            this.remoteVideo.srcObject = this.remoteStream;
        };
        
        // Handle ICE candidates
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('ICE candidate:', event.candidate);
                // In a real application, send this to the remote peer
                this.sendSignalingMessage({
                    type: 'ice-candidate',
                    candidate: event.candidate
                });
            }
        };
        
        // Handle connection state changes
        this.peerConnection.onconnectionstatechange = () => {
            console.log('Connection state:', this.peerConnection.connectionState);
            this.updateConnectionStatus(this.peerConnection.connectionState);
        };
        
        // Handle ICE connection state changes
        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('ICE connection state:', this.peerConnection.iceConnectionState);
        };
    }
    
    async createOffer() {
        try {
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            
            console.log('Offer created');
            this.sendSignalingMessage({
                type: 'offer',
                sdp: offer
            });
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    }
    
    async createAnswer(offer) {
        try {
            await this.peerConnection.setRemoteDescription(offer);
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            
            console.log('Answer created');
            this.sendSignalingMessage({
                type: 'answer',
                sdp: answer
            });
        } catch (error) {
            console.error('Error creating answer:', error);
        }
    }
    
    async handleAnswer(answer) {
        try {
            await this.peerConnection.setRemoteDescription(answer);
            console.log('Answer handled');
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    }
    
    async handleIceCandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(candidate);
            console.log('ICE candidate added');
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    }
    
    sendSignalingMessage(message) {
        // In a real application, this would send the message through a signaling server
        // For demo purposes, we'll just log it
        console.log('Signaling message:', message);
        
        // Simulate receiving the message back (for demo)
        setTimeout(() => {
            this.handleSignalingMessage(message);
        }, 1000);
    }
    
    handleSignalingMessage(message) {
        // In a real application, this would handle messages from the signaling server
        console.log('Received signaling message:', message);
        
        switch (message.type) {
            case 'offer':
                this.createAnswer(message.sdp);
                break;
            case 'answer':
                this.handleAnswer(message.sdp);
                break;
            case 'ice-candidate':
                this.handleIceCandidate(message.candidate);
                break;
        }
    }
    
    updateConnectionStatus(state) {
        const statusElement = document.createElement('div');
        statusElement.id = 'connectionStatus';
        statusElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1000;
        `;
        
        // Remove existing status
        const existing = document.getElementById('connectionStatus');
        if (existing) {
            existing.remove();
        }
        
        switch (state) {
            case 'connected':
                statusElement.textContent = 'Connecté';
                statusElement.style.background = '#2ecc71';
                statusElement.style.color = 'white';
                break;
            case 'connecting':
                statusElement.textContent = 'Connexion...';
                statusElement.style.background = '#f39c12';
                statusElement.style.color = 'white';
                break;
            case 'disconnected':
                statusElement.textContent = 'Déconnecté';
                statusElement.style.background = '#e74c3c';
                statusElement.style.color = 'white';
                break;
            case 'failed':
                statusElement.textContent = 'Échec de connexion';
                statusElement.style.background = '#e74c3c';
                statusElement.style.color = 'white';
                break;
        }
        
        document.body.appendChild(statusElement);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (statusElement.parentNode) {
                statusElement.remove();
            }
        }, 3000);
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            background: #e74c3c;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            font-weight: bold;
        `;
        errorDiv.textContent = message;
        
        const videosDiv = document.getElementById('videos');
        videosDiv.parentNode.insertBefore(errorDiv, videosDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            background: #2ecc71;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            font-weight: bold;
        `;
        successDiv.textContent = message;
        
        const videosDiv = document.getElementById('videos');
        videosDiv.parentNode.insertBefore(successDiv, videosDiv);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }
    
    stopCall() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        
        this.localVideo.srcObject = null;
        this.remoteVideo.srcObject = null;
        
        this.startBtn.disabled = false;
        this.startBtn.textContent = 'Démarrer la caméra';
        
        console.log('Call stopped');
    }
}

// Initialize video chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the live section
    if (document.getElementById('localVideo')) {
        const videoChat = new VideoChat();
        
        // Add stop button
        const stopBtn = document.createElement('button');
        stopBtn.textContent = 'Arrêter la caméra';
        stopBtn.style.marginLeft = '10px';
        stopBtn.addEventListener('click', () => videoChat.stopCall());
        
        const startBtn = document.getElementById('startBtn');
        startBtn.parentNode.insertBefore(stopBtn, startBtn.nextSibling);
    }
});