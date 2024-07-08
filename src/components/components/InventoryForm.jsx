import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="partName">Part Name</Label>
            <Input id="partName" placeholder="Enter part name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" placeholder="Enter brand" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Invoice">Invoice Number</Label>
            <Input id="Invoice" placeholder="Enter Invoice Number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input
                id="costPrice"
                placeholder="Enter cost price"
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sellPrice">Sell Price</Label>
              <Input
                id="sellPrice"
                placeholder="Enter sell price"
                type="number"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="partDescription">Part Description</Label>
            <Textarea
              id="partDescription"
              placeholder="Enter part description"
            />
          </div>
          <Button className="w-full" type="submit">
            Add to Inventory
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
