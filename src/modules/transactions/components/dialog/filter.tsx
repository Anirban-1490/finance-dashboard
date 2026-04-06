import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionFilter } from "@/store/transaction-filter";
import type { ITransactionFilterProps } from "@/type";

import { RotateCcw } from "lucide-react";
import { useState, type PropsWithChildren } from "react";

export function Filter({ children }: PropsWithChildren) {
  const initialFilter = {
    type: "",
    category: "",
    minAmount: 0,
    maxAmount: 0,
  };
  const [filters, setFilters] = useState(initialFilter);
  const setFilterStore = useTransactionFilter((state) => state.setFilter);

  const handleReset = () => {
    setFilters(initialFilter);
    setFilterStore(null);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Filter Transactions
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            setFilterStore(filters as ITransactionFilterProps);
          }}
        >
          <div className="grid gap-6 py-4">
            <div>
              <Label className="text-sm font-semibold mb-1">Amount Range</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Min"
                    min={0}
                    //   value={filters.minAmount}
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minAmount: Number(e.target.value),
                      })
                    }
                    className="pl-7 bg-background border-input  "
                  />
                </div>
                <span className="text-muted-foreground">—</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Max"
                    min={0}
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxAmount: Number(e.target.value),
                      })
                    }
                    className="pl-7 bg-background border-input  "
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="type" className="text-sm font-semibold mb-1">
                Transaction Type
              </Label>
              <Select
                value={filters.type}
                required
                onValueChange={(val) => setFilters({ ...filters, type: val })}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expense Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-semibold mb-1">
                Category
              </Label>
              <Select
                value={filters.category}
                required
                onValueChange={(val) =>
                  setFilters({ ...filters, category: val })
                }
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="services">Services</SelectItem>

                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex flex-row sm:justify-between items-center gap-2 pt-4">
            <DialogClose asChild>
              <div className="flex justify-between w-full">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
                >
                  <RotateCcw size={14} className="mr-2" />
                  Reset Filters
                </Button>

                <Button type="submit" variant={"primary"} className="">
                  Apply Filters
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
