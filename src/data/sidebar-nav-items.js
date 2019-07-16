let navItems = [
  {
    title: "Administration",
    htmlBefore: '<i class="material-icons">supervisor_account</i>',
    subItems: [
      {
        title: "Appels d'offres",

        to: "/gestionDesAO"
      }
    ]
  }
];

export default function() {
  return navItems;
}
