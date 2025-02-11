;; Reputation Contract

;; Define data structures
(define-map user-ratings
  principal
  { total-score: uint, review-count: uint }
)

;; Error codes
(define-constant err-invalid-rating (err u100))

;; Functions
(define-public (rate-user (user principal) (rating uint))
  (begin
    (asserts! (and (>= rating u1) (<= rating u5)) err-invalid-rating)
    (match (map-get? user-ratings user)
      existing-rating (map-set user-ratings
        user
        {
          total-score: (+ (get total-score existing-rating) rating),
          review-count: (+ (get review-count existing-rating) u1)
        })
      (map-set user-ratings
        user
        { total-score: rating, review-count: u1 }
      )
    )
    (ok true)
  )
)

(define-read-only (get-user-rating (user principal))
  (match (map-get? user-ratings user)
    rating (some {
      average-rating: (/ (get total-score rating) (get review-count rating)),
      review-count: (get review-count rating)
    })
    none
  )
)

