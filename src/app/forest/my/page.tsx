"use client";

import { MyItemType, PostUsingItem } from "@/types/api/item";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { DraggableData } from "react-draggable";
import DraggableItem from "./draggable-item";
import clsx from "clsx";
import MyBox from "./my-box-btn";
import { useResizeWindowCell } from "@/hooks/useResizeWindowCell";
import { CELL_COL_CNT, CELL_ROW_CNT } from "@/lib/_shared/item";

export default function Page() {
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<null | number>(null);
  const [editError, setEditError] = useState<boolean>(false);
  const [items, setItems] = useState<PostUsingItem[]>(usingItems);

  const groundBoard = useRef<boolean[][]>(
    Array(CELL_ROW_CNT)
      .fill(null)
      .map(() => Array(CELL_COL_CNT).fill(false))
  );

  const { cellWidth, cellHalfWidth } = useResizeWindowCell();

  useEffect(() => {
    setItems(
      usingItems.map((item) => {
        if (item.category === "GROUND")
          groundBoard.current[item.posX][item.posY] = true;
        return {
          ...item,
          posX: item.posX * cellWidth,
          posY: item.posY * cellWidth,
        };
      })
    );
  }, [cellWidth]);

  useEffect(() => {
    if (!editMode) setEditingItem(null);
  }, [editMode]);

  useEffect(() => {
    if (editingItem) setEditMode(true);
  }, [editingItem]);

  const handleRemove = (myItemId: number) => {
    setItems((prev) => prev.filter((item) => item.myItemId !== myItemId));
    setEditMode(false);
  };

  const handleComplete = (item: PostUsingItem) => {
    if (
      item.category === "GROUND" &&
      groundBoard.current[Math.floor(item.posX / (cellWidth / 2))][
        Math.floor(item.posY / (cellHalfWidth / 2))
      ]
    )
      setEditError(true);
    else {
      setEditMode(false);
      groundBoard.current[Math.floor(item.posX / (cellWidth / 2))][
        Math.floor(item.posY / (cellHalfWidth / 2))
      ] = true;
    }
  };

  const handleNewItem = (newItem: MyItemType) => {
    const { myItemId, image, category } = newItem;
    setItems((prev) => [
      ...prev,
      { myItemId, image, category, posX: 0, posY: 0 },
    ]);
    setEditingItem(myItemId);
  };

  const handleClickItem = (item: PostUsingItem) => {
    if (editingItem === null) {
      setEditingItem(item.myItemId);
      groundBoard.current[Math.floor(item.posX / (cellWidth / 2))][
        Math.floor(item.posY / (cellHalfWidth / 2))
      ] = false;
    }
  };

  const onControlledDrag = (e: Event, position: DraggableData, id: number) => {
    setEditError(false);
    const { x, y } = position;

    const xCond = x % cellWidth === 0;
    const yCond = y % cellHalfWidth === 0;
    const targetItem = items.find((item) => item.myItemId === id);

    if (!targetItem) return;

    if (xCond != yCond) {
      const isOver = x === 0; // 왼쪽 끝으로 마름모 반이 잘리는 현상 방지
      setItems((prev) =>
        prev.map((item: PostUsingItem) =>
          item.myItemId === id
            ? {
                ...item,
                posX: isOver ? x + cellHalfWidth : x - cellHalfWidth,
                posY: y,
              }
            : item
        )
      );
    } else
      setItems((prev) =>
        prev.map((item: PostUsingItem) =>
          item.myItemId === id ? { ...item, posX: x, posY: y } : item
        )
      );
  };

  return (
    <div
      className={clsx(
        "relative -mx-4 flex flex-col gap-3 h-full justify-center"
      )}
    >
      {/** Field */}
      <div
        className="bg-green-600 mx-auto p-auto"
        style={{
          width: cellWidth * CELL_COL_CNT,
        }}
      >
        <div className="relative flex flex-wrap">
          {items.map((item, idx) => (
            //@ts-ignore
            <DraggableItem
              key={idx}
              item={item}
              position={{ x: item.posX, y: item.posY }}
              width={cellWidth} // custom variable
              height={cellHalfWidth} // custom variable
              editMode={editMode}
              editingItem={editingItem}
              handleRemove={handleRemove}
              handleComplete={handleComplete}
              editError={editError}
              disabled={
                !editMode || (editMode && editingItem !== item.myItemId)
              }
              onMouseDown={() => handleClickItem(item)}
              onStop={(e: any, position: DraggableData) =>
                onControlledDrag(e, position, item.myItemId)
              }
              grid={[cellHalfWidth, cellHalfWidth / 2]}
              bounds="parent"
              defaultPosition={{ x: 0, y: 0 }}
            />
          ))}

          {Array(CELL_COL_CNT * CELL_ROW_CNT)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="flex shrink-0 opacity-40">
                <div
                  className="box-border w-0 h-0"
                  style={{
                    ...(editMode
                      ? {
                          borderTop: `${cellHalfWidth / 2}px solid transparent`,
                          borderRight: `${cellHalfWidth}px solid white`,
                          borderBottom: `${
                            cellHalfWidth / 2
                          }px solid transparent`,
                        }
                      : {
                          borderTop: `${cellHalfWidth / 2}px solid transparent`,
                          borderRight: `${cellHalfWidth}px solid transparent`,
                          borderBottom: `${
                            cellHalfWidth / 2
                          }px solid transparent`,
                        }),
                  }}
                />
                <div
                  className="box-border border-transparent w-0 h-0"
                  style={{
                    ...(editMode
                      ? {
                          borderTop: `${cellHalfWidth / 2}px solid transparent`,
                          borderLeft: `${cellHalfWidth}px solid white`,
                          borderBottom: `${
                            cellHalfWidth / 2
                          }px solid transparent`,
                        }
                      : {
                          borderTop: `${cellHalfWidth / 2}px solid transparent`,
                          borderLeft: `${cellHalfWidth}px solid transparent`,
                          borderBottom: `${
                            cellHalfWidth / 2
                          }px solid transparent`,
                        }),
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {!editMode && <MyBox handleNewItem={handleNewItem} />}
    </div>
  );
}

const usingItems: PostUsingItem[] = [
  {
    myItemId: 1,
    image: "/temp/forest/ground-item3.png",
    posX: 0,
    posY: 0,
    category: "GROUND",
  },
  {
    myItemId: 2,
    image: "/temp/forest/ground-item3.png",
    posX: 1,
    posY: 0,
    category: "GROUND",
  },
];
