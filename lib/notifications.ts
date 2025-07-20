import { prisma } from './prisma'

export type NotificationType = 
  | 'PROFILE_UPDATED'
  | 'PASSWORD_CHANGED'
  | 'NEW_CONNECTION_REQUEST'
  | 'CONNECTION_ACCEPTED'
  | 'NEW_MESSAGE'
  | 'SYSTEM_ANNOUNCEMENT'

export async function createNotification({
  userId,
  type,
  title,
  content,
  data = null
}: {
  userId: string
  type: NotificationType
  title: string
  content: string
  data?: any
}) {
  try {
    await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        content,
        data,
        isRead: false
      }
    })
    console.log(`Notification created for user ${userId}: ${title}`)
  } catch (error) {
    console.error('Failed to create notification:', error)
    // Don't throw error - notification creation shouldn't break main flow
  }
} 