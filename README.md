# Latexify

An extension that uses GPT-3 to convert text to latex. Some examples:
`Let phi : A -> B. If A,B fields, then phi is either the 0 map or A iso phi(A).` ->
`Let $\phi : A \to B$. If $A$ and $B$ are fields, then $\phi$ is either the zero map or $A$ is isomorphic to $\phi(A)$.`

`The kernel of a hom phi : A -> B is defined as ker phi = {elems that are mapped to 0}` -> `The kernel of a homomorphism $\phi : A \to B$ is defined as $\ker \phi = \{x \in A \mid \phi(x) = 0\}$.`

## Configuration and use

1. Get an API key from OpenAI and paste it in the settings
2. Press ctr+cmd+g or cmd+shift+p and select "Convert Latex" to convert the currently selected text to LateX. If no text is selected, the current line is converted.