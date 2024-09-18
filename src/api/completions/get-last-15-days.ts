import axiosInstance from "../axiosInstance"
import type { Goals } from "../promise.type"

export interface Root {
  status: string
  message: string
  result: Record<string, Result>
}



export interface Result {
  goals: GoalCompletion[]
  count: number
  totalGoals: number
}

export interface GoalCompletion {
  id: string
  goalId: string
  createdAt: string
  goal: Goals
}


 export async function GetGoalsLast15Days(): Promise<Root> {
  const response = await axiosInstance.get("/completions-goals/last-15-days")
  return response.data
 }