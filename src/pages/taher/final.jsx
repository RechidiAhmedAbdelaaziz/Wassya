import React, { useMemo } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

function addIf(label, value) {
  return value ? `${label}${value}` : null;
}

function addParagraphIf(label, value) {
  return value ? new Paragraph(`${label}${value}`) : null;
}

const DownloadWordButton = ({ active, user, laveuse, imam, cimetiere, responsable, creanciers, today, mesbiens, distribue }) => {
  let display;
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US');
  if (active == 14) {
    display = true;
  }

  // Generate the Wasiya result as plain text for copy
  const wasiyaText = useMemo(() => {
    const lines = [];
    lines.push("MY Wasiya", "");
    // Identité du testateur
    const identity = [
      addIf("Nom : ", user.nom),
      addIf("Prénom : ", user.prénom),
      addIf("Date de naissance : ", user.date),
      addIf("Ville de naissance : ", user.ville),
      addIf("Pays de naissance : ", user.pays),
    ].filter(Boolean);
    if (identity.length) {
      lines.push("Identité du testateur :");
      lines.push(...identity, "");
    }
    // Filiation
    const filiation = [];
    if (user.nompere || user.prénompere) {
      filiation.push(
        [user.nompere, user.prénompere].filter(Boolean).length
          ? `Père : ${[user.nompere, user.prénompere].filter(Boolean).join(' ')}`
          : null
      );
    }
    if (user.nommere || user.prénommere) {
      filiation.push(
        [user.nommere, user.prénommere].filter(Boolean).length
          ? `Mère : ${[user.nommere, user.prénommere].filter(Boolean).join(' ')}`
          : null
      );
    }
    if (filiation.filter(Boolean).length) {
      lines.push("Filiation :");
      lines.push(...filiation.filter(Boolean), "");
    }
    // Profession de foi
    lines.push("\u25A0 Profession de foi");
    lines.push(
      "J'atteste qu’il n’y a d’autre divinité qu’Allah qui mérite l’adoration, et que Mohammad صلى الله عليه وسلم est Son Serviteur et Messager. Je crois en la résurrection et au jugement dernier.",
      ""
    );
    // Recommandations à mes proches
    lines.push("\u25A0 Recommandations à mes proches");
    lines.push(
      "Je recommande à ma famille et à mes proches d’invoquer pour moi le pardon et la miséricorde, et de ne pas exagérer dans les pleurs.",
      ""
    );
    // Ma préparation
    const prep = [
      addIf("Je souhaite que mon corps soit lavé par : ", laveuse.laveuse),
      addIf("Coordonnées : ", laveuse.laveusecontact),
    ].filter(Boolean);
    if (prep.length) {
      lines.push("\u25A0 Ma préparation");
      lines.push(...prep, "");
    }
    // Ma Salat Janaza
    const janaza = [
      addIf("Je souhaite que la salat Janaza soit dirigée par : ", imam.imam),
      addIf("Coordonnées :  ", imam.imamcontact),
      "Je demande qu’aucune femme ne suive le convoi funéraire ni ne visite ma tombe."
    ].filter(Boolean);
    if (janaza.length > 1) {
      lines.push("\u25A0 Ma Salat Janaza");
      lines.push(...janaza, "");
    }
    // Mon enterrement
    const enterrement = [
      addIf("Je souhaite être enterré au cimetière de : ", cimetiere.cimetiere),
      (responsable.responsable || responsable.responsablecontact) ?
        `Rapatriement à gérer par : ${responsable.responsable || ''}${responsable.responsable && responsable.responsablecontact ? ' & ' : ''}Coordonnées:${responsable.responsablecontact || ''}` : null,
      "Ma tombe doit être conforme à la sunna : pas de décoration, pas de contours en ciment, pas de pierre tombale avec mon nom. Une tombe simple, bombée, avec une pierre à la tête et une à la base."
    ].filter(Boolean);
    if (enterrement.length > 1 || (enterrement.length === 1 && !enterrement[0].startsWith("Ma tombe"))) {
      lines.push("\u25A0 Mon enterrement");
      lines.push(...enterrement, "");
    }
    // Dettes
    if (creanciers.length > 0) {
      lines.push("\u25A0 Mes dettes");
      creanciers.forEach((d, i) => {
        lines.push(`  ${i + 1}. Créancier : ${d.creanciername || ''}${d.creanciercontact ? ' | Contact : ' + d.creanciercontact : ''}${d.creancierprice ? ' | Montant : ' + d.creancierprice : ''}`.replace(/( \| )+$/, ''));
      });
      lines.push("");
    } else {
      lines.push("Je n’ai aucune dette à déclarer.", "");
    }
    // Héritage
    const heritage = [
      addIf("Je souhaite que mon héritage soit distribué par : ", distribue.distribue),
      addIf("Coordonnées : ", distribue.distribuecontact),
    ].filter(Boolean);
    if (heritage.length) {
      lines.push("\u25A0 Héritage");
      lines.push(...heritage, "");
    }
    // Biens
    if (mesbiens.length > 0) {
      lines.push("\u25A0 Mes biens");
      mesbiens.forEach((bien, i) => lines.push(`  ${i + 1}. ${bien}`));
      lines.push("");
    } else {
      lines.push("Je ne possède aucun bien à déclarer.", "");
    }
    // Dua finale
    lines.push("\u25A0 Dua finale");
    lines.push("Ô Allah, permets-moi de remercier les bienfaits que Tu m’as accordés, à moi et à mes parents, et de faire de bonnes actions qui Te satisfassent. Je me repens à Toi et je suis du nombre des musulmans.", "");
    // Fait à
    if (today.location) lines.push(`Fait à : ${today.location}`);
    lines.push(`Le : ${formattedDate}`);
    return lines.filter(Boolean).join("\n");
  }, [user, laveuse, imam, cimetiere, responsable, creanciers, today, mesbiens, distribue, formattedDate]);

  const generateDoc = async () => {
    const children = [];
    children.push(new Paragraph({
      children: [
        new TextRun({
          text: "MY Wasiya",
          bold: true,
          size: 32,
        }),
      ],
    }));
    children.push(new Paragraph(""));
    // Identité du testateur
    const identity = [
      addParagraphIf("Nom : ", user.nom),
      addParagraphIf("Prénom : ", user.prénom),
      addParagraphIf("Date de naissance : ", user.date),
      addParagraphIf("Ville de naissance : ", user.ville),
      addParagraphIf("Pays de naissance : ", user.pays),
    ].filter(Boolean);
    if (identity.length) {
      children.push(new Paragraph({ text: "Identité du testateur :", bold: true }));
      children.push(...identity, new Paragraph(""));
    }
    // Filiation
    const filiation = [];
    if (user.nompere || user.prénompere) {
      filiation.push(
        [user.nompere, user.prénompere].filter(Boolean).length
          ? `Père : ${[user.nompere, user.prénompere].filter(Boolean).join(' ')}`
          : null
      );
    }
    if (user.nommere || user.prénommere) {
      filiation.push(
        [user.nommere, user.prénommere].filter(Boolean).length
          ? `Mère : ${[user.nommere, user.prénommere].filter(Boolean).join(' ')}`
          : null
      );
    }
    if (filiation.filter(Boolean).length) {
      children.push(new Paragraph({ text: "Filiation :", bold: true }));
      children.push(...filiation.filter(Boolean), new Paragraph(""));
    }
    // Profession de foi
    children.push(new Paragraph({ text: "Profession de foi", bold: true }));
    children.push(new Paragraph("J'atteste qu’il n’y a d’autre divinité qu’Allah qui mérite l’adoration, et que Mohammad صلى الله عليه وسلم est Son Serviteur et Messager. Je crois en la résurrection et au jugement dernier."), new Paragraph(""));
    // Recommandations à mes proches
    children.push(new Paragraph({ text: "Recommandations à mes proches", bold: true }));
    children.push(new Paragraph("Je recommande à ma famille et à mes proches d’invoquer pour moi le pardon et la miséricorde, et de ne pas exagérer dans les pleurs."), new Paragraph(""));
    // Ma préparation
    const prep = [
      addParagraphIf("Je souhaite que mon corps soit lavé par : ", laveuse.laveuse),
      addParagraphIf("Coordonnées : ", laveuse.laveusecontact),
    ].filter(Boolean);
    if (prep.length) {
      children.push(new Paragraph({ text: "Ma préparation", bold: true }));
      children.push(...prep, new Paragraph(""));
    }
    // Ma Salat Janaza
    const janaza = [
      addParagraphIf("Je souhaite que la salat Janaza soit dirigée par : ", imam.imam),
      addParagraphIf("Coordonnées :  ", imam.imamcontact),
      new Paragraph("Je demande qu’aucune femme ne suive le convoi funéraire ni ne visite ma tombe.")
    ].filter(Boolean);
    if (janaza.length > 1) {
      children.push(new Paragraph({ text: "Ma Salat Janaza", bold: true }));
      children.push(...janaza, new Paragraph(""));
    }
    // Mon enterrement
    const enterrement = [
      addParagraphIf("Je souhaite être enterré au cimetière de : ", cimetiere.cimetiere),
      (responsable.responsable || responsable.responsablecontact) ?
        new Paragraph(`Rapatriement à gérer par : ${responsable.responsable || ''}${responsable.responsable && responsable.responsablecontact ? ' & ' : ''}Coordonnées:${responsable.responsablecontact || ''}`) : null,
      new Paragraph("Ma tombe doit être conforme à la sunna : pas de décoration, pas de contours en ciment, pas de pierre tombale avec mon nom. Une tombe simple, bombée, avec une pierre à la tête et une à la base.")
    ].filter(Boolean);
    if (enterrement.length > 1 || (enterrement.length === 1 && enterrement[0].root[0].text !== "Ma tombe doit être conforme à la sunna : pas de décoration, pas de contours en ciment, pas de pierre tombale avec mon nom. Une tombe simple, bombée, avec une pierre à la tête et une à la base.")) {
      children.push(new Paragraph({ text: "Mon enterrement", bold: true }));
      children.push(...enterrement, new Paragraph(""));
    }
    // Dettes
    if (creanciers.length > 0) {
      children.push(new Paragraph({ text: "Mes dettes", bold: true }));
      creanciers.forEach((d, i) => {
        children.push(new Paragraph(`  ${i + 1}. Créancier : ${d.creanciername || ''}${d.creanciercontact ? ' | Contact : ' + d.creanciercontact : ''}${d.creancierprice ? ' | Montant : ' + d.creancierprice : ''}`.replace(/( \| )+$/, '')));
      });
      children.push(new Paragraph(""));
    } else {
      children.push(new Paragraph("Je n’ai aucune dette à déclarer."), new Paragraph(""));
    }
    // Héritage
    const heritage = [
      addParagraphIf("Je souhaite que mon héritage soit distribué par : ", distribue.distribue),
      addParagraphIf("Coordonnées : ", distribue.distribuecontact),
    ].filter(Boolean);
    if (heritage.length) {
      children.push(new Paragraph({ text: "Héritage", bold: true }));
      children.push(...heritage, new Paragraph(""));
    }
    // Biens
    if (mesbiens.length > 0) {
      children.push(new Paragraph({ text: "Mes biens", bold: true }));
      mesbiens.forEach((bien, i) => children.push(new Paragraph(`  ${i + 1}. ${bien}`)));
      children.push(new Paragraph(""));
    } else {
      children.push(new Paragraph("Je ne possède aucun bien à déclarer."), new Paragraph(""));
    }
    // Dua finale
    children.push(new Paragraph({ text: "Dua finale", bold: true }));
    children.push(new Paragraph("Ô Allah, permets-moi de remercier les bienfaits que Tu m’as accordés, à moi et à mes parents, et de faire de bonnes actions qui Te satisfassent. Je me repens à Toi et je suis du nombre des musulmans."), new Paragraph(""));
    // Fait à
    if (today.location) children.push(new Paragraph(`Fait à : ${today.location}`));
    children.push(new Paragraph(`Le : ${formattedDate}`));

    const doc = new Document({
      sections: [
        {
          children,
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Mon_Testament.docx");
  };

  function handleCopy() {
    navigator.clipboard.writeText(wasiyaText);
  }

  return (
    <>
      {!display ? "" : (
        <div className="container ">
          <h1 className="page-title">Votre Wasiya</h1>
          <div className="wasiya-result-box">
            <div className="wasiya-section">
              <textarea
                className="wasiya-textarea"
                value={wasiyaText}
                readOnly
                rows={18}
                style={{ width: '100%', minHeight: '350px', fontSize: '1.1rem', background: '#181818', color: '#fff', border: '1px solid #b30000', borderRadius: '10px', padding: '18px', marginBottom: '18px', fontFamily: 'Poppins, sans-serif' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <button className="download-butt" onClick={handleCopy}>Copier le texte</button>
              <button className="download-butt" onClick={generateDoc}>Télécharger mon wasiya</button>
            </div>
            <div className="wasiya-table-section">
              {mesbiens.length > 0 && (
                <div className="wasiya-table-block">
                  <div className="wasiya-table-title">Détail des biens</div>
                  <table className="wasiya-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Description du bien</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mesbiens.map((bien, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{bien}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadWordButton;