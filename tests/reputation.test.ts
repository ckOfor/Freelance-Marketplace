import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for user ratings
const userRatings = new Map()

// Mock functions to simulate contract behavior
function rateUser(user: string, rating: number) {
  if (rating < 1 || rating > 5) throw new Error("Invalid rating")
  const existingRating = userRatings.get(user) || { totalScore: 0, reviewCount: 0 }
  userRatings.set(user, {
    totalScore: existingRating.totalScore + rating,
    reviewCount: existingRating.reviewCount + 1,
  })
  return true
}

function getUserRating(user: string) {
  const rating = userRatings.get(user)
  if (!rating) return null
  return {
    averageRating: rating.totalScore / rating.reviewCount,
    reviewCount: rating.reviewCount,
  }
}

describe("Reputation Contract", () => {
  beforeEach(() => {
    userRatings.clear()
  })
  
  it("should rate a user", () => {
    const result = rateUser("user1", 4)
    expect(result).toBe(true)
    const rating = getUserRating("user1")
    expect(rating).toEqual({ averageRating: 4, reviewCount: 1 })
  })
  
  it("should update existing user rating", () => {
    rateUser("user1", 4)
    rateUser("user1", 5)
    const rating = getUserRating("user1")
    expect(rating).toEqual({ averageRating: 4.5, reviewCount: 2 })
  })
  
  it("should not allow invalid ratings", () => {
    expect(() => rateUser("user1", 0)).toThrow("Invalid rating")
    expect(() => rateUser("user1", 6)).toThrow("Invalid rating")
  })
  
  it("should return null for unrated users", () => {
    const rating = getUserRating("unrated-user")
    expect(rating).toBeNull()
  })
})

