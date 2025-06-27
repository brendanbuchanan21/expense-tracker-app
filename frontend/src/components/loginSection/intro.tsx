import './intro.css'
import { useState, useEffect, ReactNode } from "react"
import { ArrowRight, TrendingUp, PieChart, Target, Sparkles } from "lucide-react"
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Custom Button Component
const Button = ({ children, onClick, className = "", ...props }: {
    children: ReactNode
    onClick?: () => void
    className?: string
}) => {
  return (
    <button onClick={onClick} className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  )
}

// Custom Card Components
const Card = ({ children, className = "", onClick, ...props }: {
     children: ReactNode
    onClick?: () => void
    className?: string
}) => {
  return (
    <div onClick={onClick} className={`custom-card ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardContent = ({ children, className = "", ...props }: {
     children: ReactNode
    onClick?: () => void
    className?: string
}) => {
  return (
    <div className={`custom-card-content ${className}`} {...props}>
      {children}
    </div>
  )
}

const IntroComponent = () => {
    const [currentFeature, setCurrentFeature] = useState(0)
    const navigate = useNavigate();

  const features = [
    {
      title: "Track Every Expense",
      description: "Monitor your spending in real-time with intelligent categorization",
      icon: TrendingUp,
    },
    {
      title: "Visualize Your Habits",
      description: "Beautiful charts and insights reveal your spending patterns",
      icon: PieChart,
    },
    {
      title: "Take Full Control",
      description: "Set budgets, goals, and watch your financial health improve",
      icon: Target,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleCreateAccount = () => {
    window.location.href = "/welcome"
  }

  const handleLogin = () => {
    window.location.href = "/login"
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles className="badge-icon" />
              <span className="badge-text">Your Financial Journey Starts Here</span>
            </div>

            <h1 className="hero-title">
              Unlock Your
              <span className="hero-title-accent">Financial Clarity</span>
            </h1>

            <p className="hero-description">
              Transform the way you manage money with intelligent tracking, beautiful insights, and complete control
              over your finances.
            </p>

            <div className="hero-buttons">
              <Button onClick={() => navigate("/welcome")} className="primary-button">
                Create New Account
                <ArrowRight className="button-icon" />
              </Button>

              <button onClick={() => navigate("/login")} className="secondary-button">
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-content">
            <div className="features-header">
              <h2 className="features-title">
                Everything You Need to
                <span className="features-title-accent"> Master Your Money</span>
              </h2>
              <p className="features-description">
                Powerful features designed to give you complete visibility and control over your financial life.
              </p>
            </div>

            {/* Feature Showcase */}
            <div className="feature-showcase">
              <div className="feature-list">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card
                      key={index}
                      className={`feature-card ${currentFeature === index ? "feature-card-active" : ""}`}
                      onClick={() => setCurrentFeature(index)}
                    >
                      <CardContent className="feature-card-content">
                        <div className="feature-card-inner">
                          <div className={`feature-icon ${currentFeature === index ? "feature-icon-active" : ""}`}>
                            <Icon className="icon" />
                          </div>
                          <div className="feature-text">
                            <h3 className="feature-card-title">{feature.title}</h3>
                            <p className="feature-card-description">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="feature-display">
                <div className="feature-display-card">
                  <div className="feature-display-content">
                    <div className="feature-display-center">
                      {React.createElement(features[currentFeature].icon, {
                        className: "feature-display-icon",
                      })}
                      <h3 className="feature-display-title">{features[currentFeature].title}</h3>
                      <p className="feature-display-description">{features[currentFeature].description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Dots */}
            <div className="feature-dots">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`dot ${currentFeature === index ? "dot-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your
              <span className="cta-title-accent">Financial Future?</span>
            </h2>
            <p className="cta-description">
              Join thousands of users who have already taken control of their finances. Start your journey to financial
              clarity today.
            </p>

            <Button onClick={() => navigate("/welcome")} className="cta-button">
              Get Started Now
              <ArrowRight className="button-icon-large" />
            </Button>

            <p className="cta-disclaimer">No credit card required • Free to start • Cancel anytime</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IntroComponent;