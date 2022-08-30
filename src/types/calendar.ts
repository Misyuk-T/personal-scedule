import {
  FormatterFn,
  Group,
  GroupOrientation,
} from "@devexpress/dx-react-scheduler";

export interface TimeTableCellProps {
  startDate: Date;
  endDate?: Date;
  otherMonth?: boolean;
  today?: boolean;
  formatDate?: FormatterFn;
  groupingInfo?: Array<Group>;
  groupOrientation?: GroupOrientation;
  hasRightBorder?: boolean;
  endOfGroup?: boolean;
  isShaded?: boolean;
  onDoubleClick?: (e: any) => void;
}
