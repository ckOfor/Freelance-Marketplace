;; Escrow Contract

;; Define fungible token for payments
(define-fungible-token payment-token)

;; Define data structures
(define-map escrows
  { escrow-id: uint }
  { client: principal, freelancer: principal, amount: uint, released: bool }
)

(define-data-var next-escrow-id uint u1)

;; Error codes
(define-constant err-invalid-escrow (err u100))
(define-constant err-unauthorized (err u101))
(define-constant err-already-released (err u102))

;; Functions
(define-public (create-escrow (freelancer principal) (amount uint))
  (let
    ((escrow-id (var-get next-escrow-id)))
    (try! (ft-transfer? payment-token amount tx-sender (as-contract tx-sender)))
    (map-set escrows
      { escrow-id: escrow-id }
      { client: tx-sender, freelancer: freelancer, amount: amount, released: false }
    )
    (var-set next-escrow-id (+ escrow-id u1))
    (ok escrow-id)
  )
)

(define-public (release-escrow (escrow-id uint))
  (let
    ((escrow (unwrap! (map-get? escrows { escrow-id: escrow-id }) err-invalid-escrow)))
    (asserts! (is-eq tx-sender (get client escrow)) err-unauthorized)
    (asserts! (not (get released escrow)) err-already-released)
    (try! (as-contract (ft-transfer? payment-token (get amount escrow) tx-sender (get freelancer escrow))))
    (map-set escrows { escrow-id: escrow-id } (merge escrow { released: true }))
    (ok true)
  )
)

(define-read-only (get-escrow (escrow-id uint))
  (map-get? escrows { escrow-id: escrow-id })
)

