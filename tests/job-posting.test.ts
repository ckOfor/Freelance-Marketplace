import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for jobs and applications
const jobs = new Map()
const applications = new Map()
let nextJobId = 1

// Mock functions to simulate contract behavior
function postJob(client: string, title: string, description: string, budget: number) {
  const jobId = nextJobId++
  jobs.set(jobId, { client, title, description, budget })
  return jobId
}

function applyForJob(jobId: number, applicant: string, proposal: string) {
  if (!jobs.has(jobId)) throw new Error("Invalid job")
  const key = `${jobId}-${applicant}`
  if (applications.has(key)) throw new Error("Already applied")
  applications.set(key, { proposal })
  return true
}

function getJob(jobId: number) {
  return jobs.get(jobId)
}

function getApplication(jobId: number, applicant: string) {
  return applications.get(`${jobId}-${applicant}`)
}

describe("Job Posting Contract", () => {
  beforeEach(() => {
    jobs.clear()
    applications.clear()
    nextJobId = 1
  })
  
  it("should post a job", () => {
    const jobId = postJob("client1", "Web Developer", "Build a website", 1000)
    expect(jobId).toBe(1)
    const job = getJob(jobId)
    expect(job).toEqual({
      client: "client1",
      title: "Web Developer",
      description: "Build a website",
      budget: 1000,
    })
  })
  
  it("should apply for a job", () => {
    const jobId = postJob("client1", "Web Developer", "Build a website", 1000)
    const result = applyForJob(jobId, "freelancer1", "I can do this job")
    expect(result).toBe(true)
    const application = getApplication(jobId, "freelancer1")
    expect(application).toEqual({ proposal: "I can do this job" })
  })
  
  it("should not allow applying twice", () => {
    const jobId = postJob("client1", "Web Developer", "Build a website", 1000)
    applyForJob(jobId, "freelancer1", "I can do this job")
    expect(() => applyForJob(jobId, "freelancer1", "Second proposal")).toThrow("Already applied")
  })
})

