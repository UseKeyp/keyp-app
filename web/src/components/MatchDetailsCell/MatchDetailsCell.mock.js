const moves =
  '1. e4 c5 2. Nc3 d6 3. f4 g6 4. Nf3 Bg7 5. Bb5+ Bd7 6. Bc4 Nc6 7. d3 e6 8. O-O Nge7 9. f5 O-O 10. Qe1 gxf5 11. Bg5 f6 12. Bf4 Ne5 13. Nxe5 dxe5 14. Be3 f4 15. Bxc5 Rf7 16. Kh1 b6 17. Ba3 Ng6 18. Nb5 Bf8 19. Bxf8 Qxf8 20. a4 a5 21. Qf2 Bxb5 22. axb5 Qd6 23. b4 Rfa7 24. bxa5 Rxa5 25. Rxa5 Rxa5 26. h4 h5 27. Qf3 Ra7'

// Define your own mock data here:
export const standard = () => /* vars, { ctx, req } */ ({
  match: {
    id: 42,
    moves,
    opening: "Bird's Opening",
  },
})
