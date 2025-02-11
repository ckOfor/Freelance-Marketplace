;; Job Posting Contract

;; Define data structures
(define-map jobs
  { job-id: uint }
  { client: principal, title: (string-utf8 64), description: (string-utf8 256), budget: uint }
)

(define-map applications
  { job-id: uint, applicant: principal }
  { proposal: (string-utf8 256) }
)

(define-data-var next-job-id uint u1)

;; Error codes
(define-constant err-invalid-job (err u100))
(define-constant err-already-applied (err u101))

;; Functions
(define-public (post-job (title (string-utf8 64)) (description (string-utf8 256)) (budget uint))
  (let
    ((job-id (var-get next-job-id)))
    (map-set jobs
      { job-id: job-id }
      { client: tx-sender, title: title, description: description, budget: budget }
    )
    (var-set next-job-id (+ job-id u1))
    (ok job-id)
  )
)

(define-public (apply-for-job (job-id uint) (proposal (string-utf8 256)))
  (let
    ((job (unwrap! (map-get? jobs { job-id: job-id }) err-invalid-job)))
    (asserts! (is-none (map-get? applications { job-id: job-id, applicant: tx-sender })) err-already-applied)
    (ok (map-set applications { job-id: job-id, applicant: tx-sender } { proposal: proposal }))
  )
)

(define-read-only (get-job (job-id uint))
  (map-get? jobs { job-id: job-id })
)

(define-read-only (get-application (job-id uint) (applicant principal))
  (map-get? applications { job-id: job-id, applicant: applicant })
)

