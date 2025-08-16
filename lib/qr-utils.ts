export interface QRData {
  type: "AUTH" | "VOTE"
  payload: Record<string, any>
  timestamp: number
  signature: string
}

export interface AuthQRData extends QRData {
  type: "AUTH"
  payload: {
    userId: string
    method: "voter-id" | "email" | "phone"
    sessionId: string
  }
}

export interface VoteQRData extends QRData {
  type: "VOTE"
  payload: {
    candidateId: string
    electionId: string
    voteId: string
    encryptedVote: string
  }
}

// Simulate QR data generation with encryption
export function generateQRData(type: "AUTH" | "VOTE", payload: Record<string, any>): QRData {
  const timestamp = Date.now()
  const dataString = JSON.stringify({ type, payload, timestamp })

  // Simulate encryption/signing
  const signature = btoa(dataString).slice(0, 16)

  return {
    type,
    payload,
    timestamp,
    signature,
  }
}

// Generate QR code URL with embedded data
export function generateQRCodeURL(qrData: QRData): string {
  const encodedData = btoa(JSON.stringify(qrData))
  return `/placeholder.svg?height=200&width=200&query=QR code with encrypted data: ${qrData.type} - ${qrData.signature}`
}

// Validate QR data integrity
export function validateQRData(qrData: QRData): boolean {
  const { type, payload, timestamp, signature } = qrData

  // Check if QR is not expired (5 minutes)
  const isExpired = Date.now() - timestamp > 5 * 60 * 1000
  if (isExpired) return false

  // Validate signature
  const dataString = JSON.stringify({ type, payload, timestamp })
  const expectedSignature = btoa(dataString).slice(0, 16)

  return signature === expectedSignature
}

// Simulate QR scanning result
export function simulateQRScan(qrCodeURL: string): Promise<QRData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Extract data from URL (in real implementation, this would be actual QR scanning)
        const urlParams = new URLSearchParams(qrCodeURL.split("?")[1])
        const query = urlParams.get("query") || ""

        // Simulate successful scan with mock data
        if (query.includes("AUTH")) {
          resolve({
            type: "AUTH",
            payload: { userId: "user123", method: "voter-id", sessionId: "session456" },
            timestamp: Date.now(),
            signature: "mock_auth_sig",
          })
        } else if (query.includes("VOTE")) {
          resolve({
            type: "VOTE",
            payload: {
              candidateId: "candidate-1",
              electionId: "election-2024",
              voteId: "vote789",
              encryptedVote: "encrypted_vote_data",
            },
            timestamp: Date.now(),
            signature: "mock_vote_sig",
          })
        } else {
          resolve(null)
        }
      } catch (error) {
        resolve(null)
      }
    }, 1500) // Simulate scanning delay
  })
}

// Generate secure vote ID
export function generateVoteId(): string {
  const prefix = "VT"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// Generate session ID for authentication
export function generateSessionId(): string {
  const prefix = "SES"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 8).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}
