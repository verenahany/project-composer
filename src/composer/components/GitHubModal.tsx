/**
 * GitHubModal — prompts for a GitHub token and shows push progress.
 */

import { useState, useEffect } from 'react'
import { Github, X, ExternalLink, Check, AlertCircle, Loader2 } from 'lucide-react'
import { getStoredToken, storeToken, clearToken, validateToken, pushToGitHub } from '../generator/github'
import type { PushResult } from '../generator/github'
import type { ProjectConfig } from '../config/schema'

interface Props {
  config: ProjectConfig
  open: boolean
  onClose: () => void
}

type Phase = 'token' | 'pushing' | 'done' | 'error'

export default function GitHubModal({ config, open, onClose }: Props) {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [phase, setPhase] = useState<Phase>('token')
  const [progress, setProgress] = useState('')
  const [result, setResult] = useState<PushResult | null>(null)

  useEffect(() => {
    if (!open) return
    const saved = getStoredToken()
    if (saved) {
      setToken(saved)
      validateToken(saved).then(({ valid, username: name }) => {
        if (valid) setUsername(name)
      })
    }
    setPhase('token')
    setProgress('')
    setResult(null)
  }, [open])

  if (!open) return null

  const handleConnect = async () => {
    if (!token.trim()) return
    const { valid, username: name } = await validateToken(token.trim())
    if (valid) {
      storeToken(token.trim())
      setUsername(name)
    } else {
      setResult({ success: false, error: 'Invalid token. Make sure it has the "repo" scope.' })
      setPhase('error')
    }
  }

  const handleDisconnect = () => {
    clearToken()
    setToken('')
    setUsername('')
  }

  const handlePush = async () => {
    setPhase('pushing')
    setProgress('Starting...')
    const res = await pushToGitHub(config, token, setProgress)
    setResult(res)
    setPhase(res.success ? 'done' : 'error')
  }

  return (
    <div className="gh-modal__backdrop" onClick={onClose}>
      <div className="gh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gh-modal__header">
          <Github size={18} />
          <h3>Push to GitHub</h3>
          <button className="gh-modal__close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="gh-modal__body">
          {/* Token / account section */}
          {phase === 'token' && (
            <>
              {username ? (
                <div className="gh-modal__account">
                  <Check size={14} className="gh-modal__check" />
                  <span>Connected as <strong>{username}</strong></span>
                  <button className="gh-modal__link-btn" onClick={handleDisconnect}>Disconnect</button>
                </div>
              ) : (
                <div className="gh-modal__token-form">
                  <p className="gh-modal__hint">
                    Enter a GitHub Personal Access Token with <strong>repo</strong> scope.{' '}
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=Project+Composer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gh-modal__link"
                    >
                      Create one <ExternalLink size={11} />
                    </a>
                  </p>
                  <input
                    type="password"
                    className="gh-modal__input"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                  />
                  <button className="gh-modal__btn gh-modal__btn--primary" onClick={handleConnect}>
                    Connect
                  </button>
                </div>
              )}

              {username && (
                <div className="gh-modal__push-section">
                  <p className="gh-modal__repo-name">
                    Will create: <strong>{username}/{config.projectName.replace(/[^a-zA-Z0-9_.-]/g, '-')}</strong>
                  </p>
                  <button className="gh-modal__btn gh-modal__btn--primary gh-modal__btn--full" onClick={handlePush}>
                    <Github size={15} />
                    Create Repository
                  </button>
                </div>
              )}
            </>
          )}

          {/* Progress */}
          {phase === 'pushing' && (
            <div className="gh-modal__progress">
              <Loader2 size={20} className="gh-modal__spinner" />
              <p>{progress}</p>
            </div>
          )}

          {/* Success */}
          {phase === 'done' && result?.repoUrl && (
            <div className="gh-modal__result gh-modal__result--success">
              <Check size={20} />
              <p>Repository created!</p>
              <a
                href={result.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-modal__btn gh-modal__btn--primary gh-modal__btn--full"
              >
                <Github size={15} />
                Open {result.repoUrl.replace('https://github.com/', '')}
                <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Error */}
          {phase === 'error' && (
            <div className="gh-modal__result gh-modal__result--error">
              <AlertCircle size={20} />
              <p>{result?.error}</p>
              <button className="gh-modal__btn" onClick={() => setPhase('token')}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
