import {
	AdjustmentsHorizontalIcon,
	ChevronRightIcon,
	CubeIcon,
	HeartIcon,
	NoSymbolIcon,
	ShoppingCartIcon,
	TicketIcon,
	TruckIcon,
	UserIcon,
	WalletIcon,
} from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";
import cx from "classnames";
import Link from "next/link";
import { useState } from "react";
import { LogoutModal } from "~/app/_components/features/LogoutModal";
import { UserWalletsModal } from "~/app/_components/features/UserWalletsModal";

type ProfileOption = {
	icon: React.ElementType;
	label: string;
	href?: string;
	customClass?: string;
	iconColor?: string;
	onClick?: () => void;
};

interface ProfileOptionsProps {
	address?: string;
}

const optionStyles = cva(
	"flex items-center justify-between p-2 cursor-pointer",
	{
		variants: {
			intent: {
				default: "text-content-body-default",
				error: "text-error-default",
			},
		},
		defaultVariants: {
			intent: "default",
		},
	},
);

const iconStyles = cva("w-5 h-5 mr-3", {
	variants: {
		intent: {
			default: "text-content-body-default",
			error: "text-error-default",
		},
	},
	defaultVariants: {
		intent: "default",
	},
});

function ProfileOptions({ address: _ }: ProfileOptionsProps) {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
	const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

	const closeLogoutModal = () => {
		setIsLogoutModalOpen(false);
	};

	const openLogoutModal = () => {
		setIsLogoutModalOpen(true);
	};

	const openWalletModal = () => {
		setIsWalletModalOpen(true);
	};

	const closeWalletModal = () => {
		setIsWalletModalOpen(false);
	};

	const profileOptions: ProfileOption[] = [
		{ icon: UserIcon, label: "Edit profile", href: "/user/edit-profile" },
		{ icon: TicketIcon, label: "My Coffee", href: "/user/my-coffee" },
		{ icon: TruckIcon, label: "My Sales", href: "/user/my-sales" },
		{ icon: ShoppingCartIcon, label: "My Orders", href: "/user/my-orders" },
		{ icon: HeartIcon, label: "Favorite products", href: "/user/favorites" },
		{ icon: CubeIcon, label: "My collectibles", href: "/user/collectibles" },
		{ icon: WalletIcon, label: "Wallet", onClick: openWalletModal },
		{
			icon: AdjustmentsHorizontalIcon,
			label: "Settings",
			href: "/user/settings",
		},
		{
			icon: NoSymbolIcon,
			label: "Log out",
			customClass: "text-error-default",
			iconColor: "text-error-default",
			onClick: openLogoutModal,
		},
	];

	return (
		<>
			<div className="bg-surface-inverse rounded-lg overflow-hidden">
				{profileOptions.map((option, index) => (
					<div key={option.label}>
						<div
							onClick={option.onClick}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									option.onClick?.();
								}
							}}
							role="button"
							tabIndex={0}
							className={optionStyles({
								intent:
									option.customClass === "text-error-default"
										? "error"
										: "default",
							})}
						>
							{option.onClick ? (
								<>
									<div className="flex items-center">
										<option.icon
											className={iconStyles({
												intent:
													option.iconColor === "text-error-default"
														? "error"
														: "default",
											})}
										/>
										<span
											className={
												option.customClass ?? "text-content-body-default"
											}
										>
											{option.label}
										</span>
									</div>
									<ChevronRightIcon className="text-content-body-default w-5 h-5" />
								</>
							) : (
								<Link
									href={option.href ?? ""}
									className="flex items-center justify-between w-full"
								>
									<div className="flex items-center">
										<option.icon
											className={iconStyles({
												intent:
													option.iconColor === "text-error-default"
														? "error"
														: "default",
											})}
										/>
										<span
											className={
												option.customClass ?? "text-content-body-default"
											}
										>
											{option.label}
										</span>
									</div>
									<ChevronRightIcon className="text-content-body-default w-5 h-5" />
								</Link>
							)}
						</div>
						{index < profileOptions.length - 1 && (
							<hr className={cx("my-2", "surface-primary-soft")} />
						)}
					</div>
				))}
			</div>
			<LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
			<UserWalletsModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
		</>
	);
}

export { ProfileOptions };
