let navItems = [
  {
    title: "Administration",
    htmlBefore: '<i class="material-icons">supervisor_account</i>',
    subItems: [
      {
        title: "gestion des Utilisateurs",

        to: "/gestionDesUtilisateurs"
      }
    ]
  }
];

export default function() {
  return navItems;
}
