"use client"

import * as React from "react"
import { MoreHorizontal, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface KanbanAssignee {
  name: string
  image?: string
}

interface KanbanCard {
  id: string
  title: string
  description?: string
  labels?: string[]
  assignee?: KanbanAssignee
  dueDate?: string
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

interface KanbanBoardProps extends React.ComponentProps<"div"> {
  columns: KanbanColumn[]
  /**
   * Called when a card is moved via drag and drop or the per-card move menu.
   * `index` is the insertion position in the target column, computed against
   * the target column's card list before the card is removed from its source.
   *
   * Drop behavior: dropping on a card inserts before it (or after it when the
   * pointer is in the lower half of the card); dropping on a column's empty
   * area appends the card to the end.
   */
  onCardMove: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    index: number
  ) => void
  /** When provided, renders an add button in each column header. */
  onAddCard?: (columnId: string) => void
}

interface DragState {
  cardId: string
  fromColumnId: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function KanbanBoard({
  columns,
  onCardMove,
  onAddCard,
  className,
  ...props
}: KanbanBoardProps) {
  const [dragState, setDragState] = React.useState<DragState | null>(null)
  const [dragOverColumnId, setDragOverColumnId] = React.useState<string | null>(
    null
  )

  const endDrag = React.useCallback(() => {
    setDragState(null)
    setDragOverColumnId(null)
  }, [])

  const handleDrop = React.useCallback(
    (toColumnId: string, index: number) => {
      if (dragState) {
        onCardMove(dragState.cardId, dragState.fromColumnId, toColumnId, index)
      }
      endDrag()
    },
    [dragState, onCardMove, endDrag]
  )

  return (
    <div
      className={cn("flex gap-4 overflow-x-auto pb-4", className)}
      {...props}
    >
      {columns.map((column) => (
        <div
          key={column.id}
          className={cn(
            "flex w-72 shrink-0 flex-col gap-3 rounded-lg p-2 transition-colors",
            dragOverColumnId === column.id && "bg-accent/50 ring-1 ring-border"
          )}
          onDragOver={(event) => {
            event.preventDefault()
            event.dataTransfer.dropEffect = "move"
            setDragOverColumnId(column.id)
          }}
          onDragLeave={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setDragOverColumnId((current) =>
                current === column.id ? null : current
              )
            }
          }}
          onDrop={(event) => {
            event.preventDefault()
            handleDrop(column.id, column.cards.length)
          }}
        >
          <div className="flex items-center gap-2 px-1">
            <h3 className="text-sm font-medium">{column.title}</h3>
            <Badge variant="secondary">{column.cards.length}</Badge>
            {onAddCard ? (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto size-7"
                aria-label={`Add card to ${column.title}`}
                onClick={() => onAddCard(column.id)}
              >
                <Plus className="size-4" />
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            {column.cards.map((card, cardIndex) => (
              <div
                key={card.id}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", card.id)
                  event.dataTransfer.effectAllowed = "move"
                  setDragState({ cardId: card.id, fromColumnId: column.id })
                }}
                onDragEnd={endDrag}
                onDrop={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  const rect = event.currentTarget.getBoundingClientRect()
                  const insertAfter =
                    event.clientY > rect.top + rect.height / 2
                  handleDrop(column.id, cardIndex + (insertAfter ? 1 : 0))
                }}
                className={cn(
                  "cursor-grab rounded-lg border bg-card p-3 shadow-xs active:cursor-grabbing",
                  dragState?.cardId === card.id && "opacity-50"
                )}
              >
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-sm font-medium">{card.title}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mt-1 -mr-1 size-6"
                        aria-label="Move card"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Move to</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {columns
                        .filter((target) => target.id !== column.id)
                        .map((target) => (
                          <DropdownMenuItem
                            key={target.id}
                            onSelect={() =>
                              onCardMove(
                                card.id,
                                column.id,
                                target.id,
                                target.cards.length
                              )
                            }
                          >
                            Move to {target.title}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {card.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {card.description}
                  </p>
                ) : null}
                {card.labels?.length || card.assignee || card.dueDate ? (
                  <div className="mt-3 flex items-center gap-2">
                    {card.labels?.map((label) => (
                      <Badge
                        key={label}
                        variant="outline"
                        className="px-1.5 py-0 text-[10px]"
                      >
                        {label}
                      </Badge>
                    ))}
                    <div className="ml-auto flex items-center gap-2">
                      {card.dueDate ? (
                        <span className="text-xs text-muted-foreground">
                          {card.dueDate}
                        </span>
                      ) : null}
                      {card.assignee ? (
                        <Avatar className="size-5">
                          <AvatarImage
                            src={card.assignee.image}
                            alt={card.assignee.name}
                          />
                          <AvatarFallback className="text-[9px]">
                            {getInitials(card.assignee.name)}
                          </AvatarFallback>
                        </Avatar>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { KanbanBoard }
export type {
  KanbanBoardProps,
  KanbanColumn,
  KanbanCard,
  KanbanAssignee,
}
