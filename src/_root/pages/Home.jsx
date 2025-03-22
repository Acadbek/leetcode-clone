import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Calendar } from "@/components/ui/calendar"
import React from "react"
import { Link } from "react-router-dom"
import studyPLanImage from '@/assets/images/image.png'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Settings, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTablePagination } from "@/components/shared/table/table-pagination"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const columns2 = [
  {
    id: "Status",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const chartData = [
  { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
}

const sliceTitle = (title) => {
  return title.length > 50 ? title.slice(0, 60) + '...' : title
}

const columns = [
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link className="hover:text-blue-400 transition" title={row?.title} to={`/editor/${row.id}`}>{sliceTitle(row.getValue("title"))}</Link>
    ),
  },
  {
    accessorKey: "solution",
    header: "Solution",
  },
  {
    accessorKey: "acceptance",
    header: "Acceptance",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty");
      const color =
        difficulty === "Easy" ? "text-green-400" :
          difficulty === "Medium" ? "text-yellow-400" :
            difficulty === "Hard" ? "text-red-400" :
              "text-gray-100";

      return <span className={color}>{difficulty}</span>
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  }
];


const Home = () => {
  const [date, setDate] = React.useState(new Date())
  const [expanded, setExpanded] = React.useState(false);
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const dataTable = React.useMemo(() => [
    {
      id: "m5gr84i9",
      status: "✔️",
      title: "1. Two Sum",
      solution: "📄",
      acceptance: "55.7%",
      difficulty: "Medium",
      frequency: "🔒",
      newColumn: "Extra Info", // New data field
    },
    {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent 3173",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Easy",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    },
    {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    },
    {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    }, {
      id: "3u1reuv4",
      status: "🔒",
      title: "3173. Bitwise OR of Adjacent...",
      solution: "Premium",
      acceptance: "95.2%",
      difficulty: "Hard",
      frequency: "🔒",
      newColumn: "More Data", // New data field
    },
  ], [])


  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
  })

  const studyPlan = [
    {
      id: 1,
      img: studyPLanImage,
      title: 'Top Interview 150',
      description: 'Must-do List for interview prep',
      path: '#'
    },
    {
      id: 2,
      img: studyPLanImage,
      title: 'Top Interview 150',
      description: 'Must-do List for interview prep',
      path: '#'
    },
    {
      id: 3,
      img: studyPLanImage,
      title: 'Top Interview 150',
      description: 'Must-do List for interview prep',
      path: '#'
    },
    {
      id: 4,
      img: studyPLanImage,
      title: 'Top Interview 150',
      description: 'Must-do List for interview prep',
      path: '#'
    },
    {
      id: 5,
      img: studyPLanImage,
      title: 'Top Interview 150',
      description: 'Must-do List for interview prep',
      path: '#'
    },
    {
      id: 6,
      img: studyPLanImage,
      title: 'Top Interview 150',
      description: 'Must-do List for interview prep',
      path: '#'
    },
  ]

  const tags = [
    { name: "Array", count: 1868 },
    { name: "String", count: 775 },
    { name: "Hash Table", count: 680 },
    { name: "Dynamic Programming", count: 573 },
    { name: "Math", count: 563 },
    { name: "Sorting", count: 444 },
    { name: "Graph", count: 159 },
    { name: "Greedy", count: 406 },
    { name: "Binary Search", count: 303 },
    { name: "Depth-First Search", count: 314 },
  ];

  return (
    <div className="container mx-auto mt-5">
      <div className="grid md:grid-cols-4 grid-cols-1 pt-12 gap-4">
        <div className="col-span-3">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 select-none">
                <img className="rounded-lg" src="https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg" alt="" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 select-none">
                <img className="rounded-lg" src="https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg" alt="" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 select-none">
                <img className="rounded-lg" src="https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg" alt="" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 select-none">
                <img className="rounded-lg" src="https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg" alt="" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center justify-between mt-8">
            <p className="text-lg">Study Plan</p>
            <Link className="text-blue-400 text-sm" to='/'>See all</Link>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-4">
            {studyPlan.map(({ id, img, path, title, description }) => (
              <Link key={id} to={path} className="h-24 border hover:border-primary transition-all dark:bg-secondary flex gap-4 p-2 rounded-lg items-center">
                <img width={72} height={72} className="rounded-md" src={img} alt="" />
                <div className="flex flex-col ">
                  <p className="tracking-wide">{title}</p>
                  <p className="text-gray-500 text-xs tracking-wide mt-1 line-clamp-1">{description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-end mt-6 rounded-lg text-xs">
            <div className="flex flex-wrap gap-5">
              {tags.slice(0, expanded ? tags.length : 8).map((tag) => (
                <div
                  key={tag.name}
                  className="flex items-center hover:text-blue-400 cursor-pointer transition select-none"
                >
                  {tag.name}
                  <span className="ml-1 bg-secondary px-2 py-0.5 rounded-full">
                    {tag.count}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="text-sm text-blue-400 hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
          <div className="w-full mt-6">
            <div className="flex items-center justify-between gap-2">
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Lists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="unsolved">Unsolved</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arrays">Arrays</SelectItem>
                  <SelectItem value="strings">Strings</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Filter emails..."
                value={(table.getColumn("email")?.getFilterValue()) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />

              <Button variant="outline">
                <Settings className="w-5 h-5" />
              </Button>

              <Button variant='secondary' className="">
                <Shuffle className="w-5 h-5 mr-2" />
                Pick One
              </Button>
            </div>

            <div className="rounded-lg border mt-2">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

            </div>
            <DataTablePagination table={table} />
          </div>
        </div>
        <div className="col-span-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border flex justify-center items-center"
          />
          <div className="w-full flex rounded-lg border justify-between mt-4 pr-2">
            <ChartContainer
              config={chartConfig}
              className="w-[70%] aspect-square max-h-[180px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={220}
                innerRadius={60}
                outerRadius={75}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[64, 60]}
                />
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {chartData[0].visitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
            <div className="w-[30%] flex flex-col items-center gap-2 py-2">
              <div className="dark:bg-zinc-900 bg-zinc-100 rounded-lg w-full flex flex-col items-center justify-center h-[33.3%]">
                <p className="text-sm text-green-600">Easy</p>
                <p className="text-gray-400 text-xs font-semibold mt-1">31/444</p>
              </div>
              <div className="dark:bg-zinc-900 bg-zinc-100 rounded-lg w-full flex flex-col items-center justify-center h-[33.3%]">
                <p className="text-sm text-yellow-600">Middle</p>
                <p className="text-gray-400 text-xs font-semibold mt-1">31/444</p>
              </div>
              <div className="dark:bg-zinc-900 bg-zinc-100 rounded-lg w-full flex flex-col items-center justify-center h-[33.3%]">
                <p className="text-sm text-red-600">Hard</p>
                <p className="text-gray-400 text-xs font-semibold mt-1">31/444</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home