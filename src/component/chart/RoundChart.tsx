import { ChevronDown, Users } from "lucide-react";

interface RoundChartProps {
  total: number;
  completed: number;
  completedName: string;
  completedColor: string;
  late: number;
  lateName: string;
  lateColor: string;
}

const RoundChart = ({
  total,
  completed,
  completedName,
  completedColor,
  late,
  lateName,
  lateColor,
}: RoundChartProps) => {
  // Tính toán tỷ lệ phần trăm của từng phần
  const calculatePercentage = (value: number) => (value / total) * 100;

  const inactivePercentage = calculatePercentage(late);
  const activePercentage = calculatePercentage(completed);

  // Chuyển đổi tỷ lệ phần trăm thành góc trong 360 độ
  const percentageToAngle = (percentage: number) => (percentage / 100) * 360;

  const inactiveAngle = percentageToAngle(inactivePercentage);
  const activeAngle = percentageToAngle(activePercentage);

  // Tính góc bắt đầu và kết thúc cho từng phần
  const inactiveStartAngle = 0;
  const inactiveEndAngle = inactiveAngle;

  const activeStartAngle = inactiveEndAngle;
  const activeEndAngle = activeStartAngle + activeAngle;

  // Chuyển đổi từ tọa độ cực sang tọa độ Cartesian
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Tạo đường cong (arc) cho SVG
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  return (
    <div className="bg-[#1a1f37] text-white p-6 rounded-lg max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Weekly Task</h2>
        <div className="flex items-center text-sm text-gray-400">
          <span>Aug 25-Sept 25</span>
          <ChevronDown size={16} className="ml-2" />
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-400">{completedName || "No data"}</span>
            </div>
            <p className="text-2xl font-bold">{late}</p>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-sm text-gray-400">{lateName || "No data"}</span>
            </div>
            <p className="text-2xl font-bold">{completed}</p>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-bold">{total}</p>
          </div>
        </div>

        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Các vòng tròn nền */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />

            {/* Đoạn đường cong Total */}
            <path
              d={describeArc(100, 100, 90, -180, 179)}
              fill="none"
              stroke="#eab308"
              strokeWidth="8"
              strokeLinecap="butt"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="20s"
                repeatCount="indefinite"
              />
            </path>

            {/* Đoạn đường cong Active */}
            <path
              d={describeArc(
                100,
                100,
                70,
                inactiveStartAngle,
                inactiveEndAngle
              )}
              fill="none"
              stroke={completedColor}
              strokeWidth="8"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>

            {/* Đoạn đường cong Inactive */}
            <path
              d={describeArc(100, 100, 50, activeStartAngle, activeEndAngle)}
              fill="none"
              stroke={lateColor}
              strokeWidth="8"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-orange-500 rounded-full p-4">
              <Users size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundChart;
