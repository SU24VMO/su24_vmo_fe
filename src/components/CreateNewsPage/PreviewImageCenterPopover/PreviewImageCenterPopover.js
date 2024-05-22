import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../ui/popover"
  import { Button } from "../../ui/button"

 
export function PreviewImageCenterPopover({imageCenter}) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Xem thử</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Ảnh Cover</h4>
            <p className="text-sm text-muted-foreground">
              Ảnh sẽ hiển thị ở giữa
            </p>
          </div>
          <div className="grid gap-2">
          {imageCenter && <img src={imageCenter} alt="ảnh cover" />}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}