import {
	BookImage,
	Calendar,
	CircleAlert,
	CircleCheck,
	CircleX,
	Eraser,
	Eye,
	EyeOff,
	Info,
	Loader,
	Mail,
	MailCheck,
	Menu,
	Play,
	RefreshCcw,
	Search,
	SendHorizontal,
	ThumbsUp,
	TriangleAlert,
	UserRound,
	X,
} from 'lucide-react';

type IconProps = {
	className?: string;
	props?: Record<string, string>;
};

export const Icons = {
	Search: (props: IconProps) => <Search {...props} />,
	Visible: (props: IconProps) => <Eye {...props} />,
	Obscured: (props: IconProps) => <EyeOff {...props} />,
	Info: (props: IconProps) => <Info {...props} />,
	Clear: (props: IconProps) => <Eraser {...props} />,

	Menu: (props: IconProps) => <Menu {...props} />,
	Email: (props: IconProps) => <Mail {...props} />,
	User: (props: IconProps) => <UserRound {...props} />,
	Calendar: (props: IconProps) => <Calendar {...props} />,
	Company: (props: IconProps) => <BookImage {...props} />,

	Status: {
		Ok: (props: IconProps) => <ThumbsUp {...props} />,
		Error: (props: IconProps) => <CircleAlert {...props} />,
		Warning: (props: IconProps) => <TriangleAlert {...props} />,
		Sent: (props: IconProps) => <MailCheck {...props} />,
		Success: (props: IconProps) => <CircleCheck {...props} />,
		Loading: (props: IconProps) => <Loader {...props} />,
	},
	Action: {
		Go: (props: IconProps) => <Play {...props} />,
		Send: (props: IconProps) => <SendHorizontal {...props} />,
		Close: (props: IconProps) => <X {...props} />,
		Destroy: (props: IconProps) => <CircleX {...props} />,
		Reset: (props: IconProps) => <RefreshCcw {...props} />,
		Clear: (props: IconProps) => <Eraser {...props} />,
	},
};
