import { CircleCheckIcon } from "lucide-react";

export default function Alert({ success = false }) {

  const className = success
    ? "bg-alert-bg-success border-alert-stroke-success-weak border-l-[#067a57cc]"
    : "bg-alert-bg-error border-alert-stroke-error-weak border-l-[#c73a3acc]";

  const iconColor = success ? "#067A57" : "#c73a3acc";
  const text = success
    ? "Votre rapport a été créé avec succès."
    : "Erreur dans la création du rapport.";

  return (
    <div className={`${className} w-full border border-l-4 border-l-solid text-text-title-blue text-sm font-semibold rounded-md px-4 py-3`}>
      <p>
        <CircleCheckIcon
          className="me-3 -mt-0.5 inline-flex"
          size={24}
          aria-hidden="true"
          style={{ color: iconColor }} // Utilisation de style pour la couleur
          strokeWidth={2}
        />
        {text}
      </p>
    </div>
  );
}
