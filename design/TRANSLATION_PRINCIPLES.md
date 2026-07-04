# Translating references → phytoplankton instruments

**The correction that drives this doc:** the reference images are not templates to
reproduce. Each is a *successful strategy for communicating complex science*. The job
is to extract the strategy and re-express it for **our** domain (ocean-colour /
phytoplankton), where the equivalent phenomenon is usually **completely different**.
If an influence shows, it should be because the *design thinking* rhymes — never
because the interface looks copied.

Where the first bench went wrong: it copied *appearance*. "Young→old particles" was
lifted straight from the percolation poster, but **we have no particle age**. The
rotating occultation spheres were beautiful and meaningless here. That's not
creativity — that's tracing.

---

## Recurring principles across all 9 references

1. **Signal-in-place** — show the raw evidence at its spatial origin (Rosetta's
   spectra pinned over the nucleus; petrography's labelled grains; Po's thumbnail crops).
2. **Field + contour** — a continuous colour field *plus* iso-contours marking gradient/
   threshold structure (Rosetta concentration map; CFD scalar box).
3. **Marks-as-quantity** — dot/square density and size encode a scalar; texture
   aggregates perceptually (SOYO; dot-terrain; Po's forest stipple).
4. **Optical signature = identity** — colour as a *physical readout* that names the
   material (petrographic birefringence; Rosetta's temperature-coloured spectra).
5. **Boundaries carry the story** — grain edges / fronts / veins are the subject, not
   the leftover (petrography; satellite hydrology).
6. **Multi-scale + multi-layer** — locator + detail; distinct themes each get their own
   mark language, composited (Po; SOYO; satellite map).
7. **Rigorous chrome** — keys, scale bars, coordinate ticks, timestamps, provenance
   everywhere. Density is earned by decoding every mark.
8. **Relationship + state block** — an explicit relationship between entities with an
   exact numeric readout (ephemeris) → absorbed as **sensor/algorithm agreement**, not
   celestial mechanics.

---

## The translation table (reference → what it *communicated* → our phenomenon → our encoding)

| Reference | Communicated | Our equivalent phenomenon | Reinterpreted tool |
|---|---|---|---|
| RealFlow percolation | a field's state revealed through particle behaviour + accumulation | **bloom physiology** — vitality, biomass, water clarity | **Bloom Field** — colour = FLH (vitality: senescent→thriving, *not age*), size = CHL biomass, **blur = TSM turbidity** (turbid water literally renders unclear = honest uncertainty), drift follows the real front gradient |
| CFD scalar voxel box | high-dimensional scalar structure made spatially graspable | the **21-channel spectral space** of every cell | **Latent Volume** — a true **3-D dimensional reduction** (PC1/PC2/PC3, the 3-D sibling of the existing 2-D UMAP); regime clusters = knots, Mahalanobis outliers = novelty floating free. *(your idea)* |
| Rosetta water-vapour map | raw spectrum shown at its location + derived concentration field + emission contours | each cell's **21-band reflectance signature** + the CHL field | **Signature Field** — CHL concentration colourmap + iso-contours, with the actual OLCI spectral curve drawn *in place* on a sampling grid; fluorescence bump highlighted |
| Petrographic thin-section | identify material by its optical signature; grain boundaries | **optical water types** (Case-1 clear / Case-2 turbid / bloom / sediment) identified by spectral signature | **Optical Section** — cross-polarised "birefringence" palette per water type, **fronts rendered as grain boundaries** (high gradient / low Moran's I), regimes labelled with leader lines |
| SOYO density poster + dot-terrain | quantity as accreted marks; categorical mark-shape; a path threading the density | biomass density + **sensor agreement** + drift path | **Density Cartography** — CHL dot-stipple; **squares = high-confidence cells, dots = uncertain** (disagreement); a current-drift route line; multi-scale locator |
| Po-river territorial map | multi-layer thematic separation, multi-scale detail, coordinate anchoring, distance context | the scene as **registered territory** of themed layers | **Territorial Intel** — real lat/lon graticule (from `coords`), themed layers (CHL fill / TSM hatch / front network / bloom-risk hex), hotspot thumbnail strip + inter-hotspot distances |
| Occultation ephemeris | relationship geometry + exact numeric state block | *(no phytoplankton analogue)* | **Dropped** — its geometry story doesn't translate; its *state-block* discipline is reused as the readouts on the tools above |

---

Every encoding above binds to a real CAPRI quantity (CHL, FLH, TSM, aphy, KD490,
CHL_disagreement, the 9 spatial descriptors, k-means regimes, PCA/UMAP, Mahalanobis
novelty). The bench that realises them is `phyto-instruments.html`.
